'use client';

import { useState, useCallback } from 'react';
import type { QueryResponse } from '@/types/api';
import { apiService } from '@/services/api-service';

export function useQuery() {
  const [response, setResponse] = useState<QueryResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendQuery = useCallback(async (query: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiService.sendQuery({
        query,
        top_k: 3,
      });

      setResponse(response);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'An error occurred while processing your query'
      );
      setResponse(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    response,
    isLoading,
    error,
    sendQuery,
  };
}
