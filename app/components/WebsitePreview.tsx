'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface WebsitePreviewProps {
  url: string;
  title: string;
  className?: string;
  enableLazyLoading?: boolean;
  refreshInterval?: number;
  onLoad?: () => void;
  onError?: (error: string) => void;
}

interface PreviewState {
  isLoading: boolean;
  isVisible: boolean;
  hasError: boolean;
  errorMessage: string;
  isIframeLoaded: boolean;
  retryCount: number;
}

export const WebsitePreview: React.FC<WebsitePreviewProps> = ({
  url,
  title,
  className = '',
  enableLazyLoading = true,
  refreshInterval,
  onLoad,
  onError
}) => {
  const [state, setState] = useState<PreviewState>({
    isLoading: false,
    isVisible: false,
    hasError: false,
    errorMessage: '',
    isIframeLoaded: false,
    retryCount: 0
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const refreshTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Maximum retry attempts
  const MAX_RETRY_ATTEMPTS = 3;
  // Timeout for iframe loading (1 minute)
  const IFRAME_TIMEOUT = 60000;

  // Security: Validate URL format and protocol
  const validateUrl = useCallback((urlToValidate: string): boolean => {
    try {
      const urlObj = new URL(urlToValidate);
      // Only allow HTTP and HTTPS protocols for security
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch {
      return false;
    }
  }, []);

  // Clean and secure URL processing
  const processUrl = useCallback((rawUrl: string): string => {
    if (!rawUrl) return '';
    
    // Ensure URL has protocol
    let processedUrl = rawUrl.trim();
    if (!processedUrl.startsWith('http://') && !processedUrl.startsWith('https://')) {
      processedUrl = `https://${processedUrl}`;
    }
    
    if (!validateUrl(processedUrl)) {
      throw new Error('Invalid URL format');
    }
    
    return processedUrl;
  }, [validateUrl]);

  // Handle iframe load success
  const handleIframeLoad = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    setState(prev => ({
      ...prev,
      isLoading: false,
      hasError: false,
      errorMessage: '',
      isIframeLoaded: true,
      retryCount: 0
    }));

    onLoad?.();
  }, [onLoad]);

  // Handle iframe load error
  const handleIframeError = useCallback((errorMsg: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    setState(prev => ({
      ...prev,
      isLoading: false,
      hasError: true,
      errorMessage: errorMsg,
      isIframeLoaded: false
    }));

    onError?.(errorMsg);
  }, [onError]);

  // Retry loading iframe
  const retryLoad = useCallback(() => {
    setState(prev => {
      if (prev.retryCount >= MAX_RETRY_ATTEMPTS) {
        return {
          ...prev,
          hasError: true,
          errorMessage: 'Max retry attempts reached'
        };
      }

      return {
        ...prev,
        isLoading: true,
        hasError: false,
        errorMessage: '',
        retryCount: prev.retryCount + 1
      };
    });
  }, []);

  // Load iframe with timeout
  const loadIframe = useCallback(() => {
    if (!url || !state.isVisible) return;

    try {
      const secureUrl = processUrl(url);
      
      setState(prev => ({
        ...prev,
        isLoading: true,
        hasError: false,
        errorMessage: ''
      }));

      // Set timeout for iframe loading
      timeoutRef.current = setTimeout(() => {
        handleIframeError('Loading timeout - please try again');
      }, IFRAME_TIMEOUT);

      // The iframe will be rendered with the processed URL
      if (iframeRef.current) {
        iframeRef.current.src = secureUrl;
      }

    } catch (error) {
      handleIframeError(error instanceof Error ? error.message : 'Invalid URL');
    }
  }, [url, state.isVisible, processUrl, handleIframeError]);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!enableLazyLoading || !containerRef.current) {
      setState(prev => ({ ...prev, isVisible: true }));
      return;
    }

    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '50px', // Start loading 50px before element is visible
      threshold: 0.1 // Trigger when 10% of element is visible
    };

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !state.isVisible) {
            setState(prev => ({ ...prev, isVisible: true }));
            // Disconnect observer after first intersection for performance
            observerRef.current?.disconnect();
          }
        });
      },
      observerOptions
    );

    observerRef.current.observe(containerRef.current);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [enableLazyLoading, state.isVisible]);

  // Load iframe when visible
  useEffect(() => {
    if (state.isVisible && !state.isIframeLoaded && !state.hasError) {
      // Small delay to prevent rapid loading
      const delayTimeout = setTimeout(loadIframe, 100);
      return () => clearTimeout(delayTimeout);
    }
  }, [state.isVisible, state.isIframeLoaded, state.hasError, loadIframe]);

  // Auto-refresh functionality
  useEffect(() => {
    if (!refreshInterval || !state.isIframeLoaded) return;

    refreshTimeoutRef.current = setTimeout(() => {
      if (iframeRef.current && state.isIframeLoaded) {
        // Graceful refresh without flickering
        iframeRef.current.src = iframeRef.current.src;
      }
    }, refreshInterval);

    return () => {
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
      }
    };
  }, [refreshInterval, state.isIframeLoaded]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      observerRef.current?.disconnect();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
      }
    };
  }, []);

  // Render loading skeleton
  const renderLoadingSkeleton = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center"
    >
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-zinc-600 border-t-white rounded-full animate-spin" />
          <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-t-zinc-400 rounded-full animate-spin" style={{ animationDelay: '-0.5s' }} />
        </div>
        <p className="text-zinc-400 text-sm font-vertiga-regular">
          Cargando preview...
        </p>
      </div>
    </motion.div>
  );

  // Render error state
  const renderErrorState = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-zinc-900 flex items-center justify-center border border-red-800/30"
    >
      <div className="flex flex-col items-center space-y-4 text-center px-4">
        <div className="w-12 h-12 bg-red-800/20 rounded-full flex items-center justify-center">
          <span className="text-red-400 text-xl">⚠</span>
        </div>
        <div>
          <p className="text-red-400 text-sm font-vertiga-bold mb-2">
            Error al cargar preview
          </p>
          <p className="text-zinc-500 text-xs font-vertiga-regular mb-3">
            {state.errorMessage}
          </p>
          {state.retryCount < MAX_RETRY_ATTEMPTS && (
            <button
              onClick={retryLoad}
              className="bg-red-800/20 hover:bg-red-800/30 text-red-400 px-3 py-1 rounded text-xs font-vertiga-regular transition-colors duration-200 border border-red-800/40 hover:border-red-700/60"
            >
              Reintentar ({MAX_RETRY_ATTEMPTS - state.retryCount} intentos restantes)
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );

  // Render iframe
  const renderIframe = () => {
    if (!state.isVisible || (!state.isLoading && !state.isIframeLoaded)) return null;

    try {
      const secureUrl = processUrl(url);
      
      return (
        <iframe
          ref={iframeRef}
          src={secureUrl}
          title={`Preview de ${title}`}
          className={`absolute inset-0 w-full h-full transition-opacity duration-300 ${
            state.isIframeLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={handleIframeLoad}
          onError={() => handleIframeError('Failed to load iframe')}
          
          // Security attributes
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation"
          referrerPolicy="strict-origin-when-cross-origin"
          loading="lazy"
          
          // Performance attributes
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          
          // Accessibility
          aria-label={`Vista previa del sitio web ${title}`}
          role="presentation"
          
          // Additional security
          allowFullScreen={false}
          style={{
            border: 'none',
            colorScheme: 'dark'
          }}
        />
      );
    } catch {
      return null;
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`relative w-full h-full bg-zinc-900 overflow-hidden rounded-lg ${className}`}
      style={{ minHeight: '200px' }}
    >
      {/* Content overlay for better visual integration */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10 pointer-events-none z-10" />
      
      <AnimatePresence mode="wait">
        {state.hasError ? (
          renderErrorState()
        ) : state.isLoading ? (
          renderLoadingSkeleton()
        ) : null}
      </AnimatePresence>

      {renderIframe()}

      {/* Accessibility: Screen reader support */}
      <div className="sr-only">
        Vista previa del sitio web {title}. 
        {state.hasError ? `Error: ${state.errorMessage}` : 
         state.isLoading ? 'Cargando...' : 'Contenido cargado correctamente.'}
      </div>
    </div>
  );
};

export default WebsitePreview;