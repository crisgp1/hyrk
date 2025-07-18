'use client';

import { useState, useEffect } from 'react';
import { TranslationDto } from '../../application/dto/TranslationDto';
import { DIContainer } from '../../infrastructure/services/DIContainer';

export const useTranslations = (language: string = 'en') => {
  const [translations, setTranslations] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const translationAdapter = DIContainer.getInstance().getTranslationAdapter();

  useEffect(() => {
    const fetchTranslations = async () => {
      try {
        setLoading(true);
        const translationData = await translationAdapter.getTranslations(language);
        setTranslations(translationData.translations);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch translations');
      } finally {
        setLoading(false);
      }
    };

    fetchTranslations();
  }, [language, translationAdapter]);

  const getTranslation = async (key: string, fallbackLanguage?: string): Promise<string | null> => {
    try {
      return await translationAdapter.getTranslation(language, key, fallbackLanguage);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get translation');
      return null;
    }
  };

  const t = (key: string, fallback?: string): string => {
    return translations[key] || fallback || key;
  };

  return {
    translations,
    loading,
    error,
    getTranslation,
    t
  };
};