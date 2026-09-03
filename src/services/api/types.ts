import type { Options } from 'ky';

export type ApiRequestOptions = Pick<Options, 'headers' | 'searchParams' | 'signal'>;

export type ApiPostOptions = ApiRequestOptions & {
  json?: unknown;
};
