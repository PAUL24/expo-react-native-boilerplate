import { useQuery } from '@tanstack/react-query';

import { getUser } from '@/services/api/users';

export const userQueryKey = (id: number) => ['users', id] as const;

export function useUserQuery(id: number) {
  return useQuery({
    queryFn: ({ signal }) => getUser(id, signal),
    queryKey: userQueryKey(id),
  });
}
