'use client';

import { useState, useEffect } from 'react';
import { ServiceDto } from '../../application/dto/ServiceDto';
import { DIContainer } from '../../infrastructure/services/DIContainer';

export const useServices = () => {
  const [services, setServices] = useState<ServiceDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const serviceAdapter = DIContainer.getInstance().getServiceAdapter();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const allServices = await serviceAdapter.getAllServices();
        setServices(allServices);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch services');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [serviceAdapter]);

  const searchServices = async (query: string): Promise<ServiceDto[]> => {
    try {
      return await serviceAdapter.searchServices(query);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search services');
      return [];
    }
  };

  return {
    services,
    loading,
    error,
    searchServices
  };
};