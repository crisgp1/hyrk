'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface PreviewOptimizationConfig {
  maxConcurrentPreviews?: number;
  preloadDelay?: number;
  memoryCleanupInterval?: number;
  enablePrefetching?: boolean;
}

interface PreviewState {
  loadingCount: number;
  loadedPreviews: Set<string>;
  errorPreviews: Set<string>;
  preloadedUrls: Set<string>;
}

export const useWebsitePreviewOptimization = (config: PreviewOptimizationConfig = {}) => {
  const {
    maxConcurrentPreviews = 2,
    preloadDelay = 1000,
    memoryCleanupInterval = 300000, // 5 minutes
    enablePrefetching = true
  } = config;

  const [state, setState] = useState<PreviewState>({
    loadingCount: 0,
    loadedPreviews: new Set(),
    errorPreviews: new Set(),
    preloadedUrls: new Set()
  });

  const cleanupTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const preloadTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const loadingQueue = useRef<string[]>([]);

  // Performance monitoring
  const performanceMetrics = useRef<Map<string, number>>(new Map());

  // Check if preview can be loaded based on concurrent limit
  const canLoadPreview = useCallback(() => {
    return state.loadingCount < maxConcurrentPreviews;
  }, [state.loadingCount, maxConcurrentPreviews]);

  // Queue preview for loading
  const queuePreview = useCallback((url: string) => {
    if (!loadingQueue.current.includes(url)) {
      loadingQueue.current.push(url);
    }
  }, []);

  // Process loading queue
  const processLoadingQueue = useCallback(() => {
    if (canLoadPreview() && loadingQueue.current.length > 0) {
      const urlToLoad = loadingQueue.current.shift();
      if (urlToLoad) {
        setState(prev => ({
          ...prev,
          loadingCount: prev.loadingCount + 1
        }));
        return urlToLoad;
      }
    }
    return null;
  }, [canLoadPreview]);

  // Mark preview as loaded successfully
  const markPreviewLoaded = useCallback((url: string, loadTime: number = 0) => {
    setState(prev => ({
      ...prev,
      loadingCount: Math.max(0, prev.loadingCount - 1),
      loadedPreviews: new Set([...prev.loadedPreviews, url]),
      errorPreviews: new Set([...prev.errorPreviews].filter(errorUrl => errorUrl !== url))
    }));

    // Store performance metrics
    if (loadTime > 0) {
      performanceMetrics.current.set(url, loadTime);
    }

    // Process next in queue
    setTimeout(processLoadingQueue, 100);
  }, [processLoadingQueue]);

  // Mark preview as failed to load
  const markPreviewError = useCallback((url: string) => {
    setState(prev => ({
      ...prev,
      loadingCount: Math.max(0, prev.loadingCount - 1),
      errorPreviews: new Set([...prev.errorPreviews, url])
    }));

    // Process next in queue
    setTimeout(processLoadingQueue, 100);
  }, [processLoadingQueue]);

  // Prefetch URLs for better performance
  const prefetchUrl = useCallback((url: string) => {
    if (!enablePrefetching || state.preloadedUrls.has(url)) {
      return;
    }

    preloadTimeoutRef.current = setTimeout(() => {
      // Create a hidden link element to trigger prefetch
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = url;
      link.crossOrigin = 'anonymous';
      
      // Add security attributes
      link.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
      
      document.head.appendChild(link);
      
      // Remove the link after prefetch is initiated
      setTimeout(() => {
        if (document.head.contains(link)) {
          document.head.removeChild(link);
        }
      }, 1000);

      setState(prev => ({
        ...prev,
        preloadedUrls: new Set([...prev.preloadedUrls, url])
      }));
    }, preloadDelay);
  }, [enablePrefetching, preloadDelay, state.preloadedUrls]);

  // Memory cleanup
  const performMemoryCleanup = useCallback(() => {
    setState(prev => {
      // Keep only recent successful loads (limit to 50)
      const recentLoaded = new Set([...prev.loadedPreviews].slice(-50));
      // Keep only recent errors (limit to 20)
      const recentErrors = new Set([...prev.errorPreviews].slice(-20));
      // Clear old prefetched URLs
      const recentPrefetched = new Set([...prev.preloadedUrls].slice(-30));

      return {
        ...prev,
        loadedPreviews: recentLoaded,
        errorPreviews: recentErrors,
        preloadedUrls: recentPrefetched
      };
    });

    // Clear old performance metrics
    const now = Date.now();
    for (const [url, timestamp] of performanceMetrics.current.entries()) {
      if (now - timestamp > 600000) { // 10 minutes old
        performanceMetrics.current.delete(url);
      }
    }
  }, []);

  // Get preview statistics
  const getPreviewStats = useCallback(() => {
    const avgLoadTime = performanceMetrics.current.size > 0 
      ? Array.from(performanceMetrics.current.values()).reduce((sum, time) => sum + time, 0) / performanceMetrics.current.size
      : 0;

    return {
      totalLoaded: state.loadedPreviews.size,
      totalErrors: state.errorPreviews.size,
      currentlyLoading: state.loadingCount,
      queueLength: loadingQueue.current.length,
      successRate: state.loadedPreviews.size + state.errorPreviews.size > 0 
        ? (state.loadedPreviews.size / (state.loadedPreviews.size + state.errorPreviews.size)) * 100 
        : 0,
      averageLoadTime: avgLoadTime,
      prefetchedUrls: state.preloadedUrls.size
    };
  }, [state]);

  // Check if URL is already loaded or failed
  const getUrlStatus = useCallback((url: string) => {
    if (state.loadedPreviews.has(url)) return 'loaded';
    if (state.errorPreviews.has(url)) return 'error';
    if (loadingQueue.current.includes(url) || state.loadingCount > 0) return 'loading';
    return 'idle';
  }, [state]);

  // Cleanup on unmount and periodic cleanup
  useEffect(() => {
    cleanupTimeoutRef.current = setInterval(performMemoryCleanup, memoryCleanupInterval);

    return () => {
      if (cleanupTimeoutRef.current) {
        clearInterval(cleanupTimeoutRef.current);
      }
      if (preloadTimeoutRef.current) {
        clearTimeout(preloadTimeoutRef.current);
      }
    };
  }, [performMemoryCleanup, memoryCleanupInterval]);

  return {
    // State
    canLoadPreview: canLoadPreview(),
    isOptimized: true,
    
    // Methods
    queuePreview,
    markPreviewLoaded,
    markPreviewError,
    prefetchUrl,
    getPreviewStats,
    getUrlStatus,
    performMemoryCleanup,
    
    // Stats
    stats: getPreviewStats()
  };
};