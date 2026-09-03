import { ZodError } from 'zod';

import { UserSchema } from '@/schemas/user';
import type { User } from '@/schemas/user';

import { api } from './client';
import { endpoints } from './endpoints';
import { ApiError } from './errors';

export async function getUser(id: number, signal?: AbortSignal): Promise<User> {
  const payload = await api.get<unknown>(endpoints.user(id), { signal });

  try {
    return UserSchema.parse(payload);
  } catch (error) {
    if (error instanceof ZodError) {
      throw new ApiError('The API returned an unexpected response.', {
        cause: error,
        code: 'INVALID_RESPONSE',
      });
    }

    throw error;
  }
}
