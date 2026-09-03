import { QueryClient } from '@tanstack/react-query';

import { ApiError } from '@/services/api/errors';

export const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      mutations: {
        retry: false,
      },
      queries: {
        gcTime: 1000 * 60 * 30,
        refetchOnWindowFocus: false,
        retry: (failureCount, error) => {
          if (error instanceof ApiError && error.status !== undefined && error.status < 500) {
            return false;
          }

          return failureCount < 2;
        },
        staleTime: 1000 * 60 * 5,
      },
    },
  });
