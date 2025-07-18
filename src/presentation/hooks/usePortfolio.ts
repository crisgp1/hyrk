'use client';

import { useState, useEffect } from 'react';
import { ClientDto } from '../../application/dto/ClientDto';
import { DIContainer } from '../../infrastructure/services/DIContainer';

export const usePortfolio = () => {
  const [clients, setClients] = useState<ClientDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const portfolioAdapter = DIContainer.getInstance().getPortfolioAdapter();

  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true);
        const allClients = await portfolioAdapter.getAllClients();
        setClients(allClients);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch clients');
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, [portfolioAdapter]);

  const getFeaturedClients = async (limit: number = 4): Promise<ClientDto[]> => {
    try {
      return await portfolioAdapter.getFeaturedClients(limit);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch featured clients');
      return [];
    }
  };

  return {
    clients,
    loading,
    error,
    getFeaturedClients
  };
};