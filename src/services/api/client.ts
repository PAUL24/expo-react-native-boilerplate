import ky from 'ky';

import { env } from '@/config/env';
import { authService } from '@/services/auth/auth-service';

import { normalizeApiError } from './errors';

import type { ApiPostOptions, ApiRequestOptions } from './types';

const httpClient = ky.create({
  hooks: {
    beforeRequest: [
      async ({ request }) => {
        const token = await authService.getAccessToken();

        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`);
        }
      },
    ],
  },
  headers: {
    Accept: 'application/json',
  },
  baseUrl: env.apiUrl.endsWith('/') ? env.apiUrl : `${env.apiUrl}/`,
  retry: 0,
  timeout: 10_000,
});

async function get<T>(endpoint: string, options?: ApiRequestOptions): Promise<T> {
  try {
    return await httpClient.get(endpoint, options).json<T>();
  } catch (error) {
    throw await normalizeApiError(error);
  }
}

async function post<T>(endpoint: string, options?: ApiPostOptions): Promise<T> {
  try {
    return await httpClient.post(endpoint, options).json<T>();
  } catch (error) {
    throw await normalizeApiError(error);
  }
}

export const api = { get, post };
