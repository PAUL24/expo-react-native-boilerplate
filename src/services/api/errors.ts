import { HTTPError, TimeoutError } from 'ky';

type ApiErrorOptions = {
  cause?: unknown;
  code: 'ABORTED' | 'HTTP_ERROR' | 'INVALID_RESPONSE' | 'NETWORK_ERROR' | 'TIMEOUT';
  status?: number;
};

export class ApiError extends Error {
  readonly code: ApiErrorOptions['code'];
  override readonly cause: unknown;
  readonly status: number | undefined;

  constructor(message: string, options: ApiErrorOptions) {
    super(message);
    this.name = 'ApiError';
    this.cause = options.cause;
    this.code = options.code;
    this.status = options.status;
  }
}

const readServerMessage = async (response: Response): Promise<string | undefined> => {
  try {
    const body: unknown = await response.clone().json();

    if (typeof body === 'object' && body !== null && 'message' in body) {
      const message = body.message;
      return typeof message === 'string' ? message : undefined;
    }
  } catch {
    return undefined;
  }

  return undefined;
};

export async function normalizeApiError(error: unknown): Promise<ApiError> {
  if (error instanceof ApiError) {
    return error;
  }

  if (error instanceof HTTPError) {
    const serverMessage = await readServerMessage(error.response);
    return new ApiError(serverMessage ?? 'The server rejected the request.', {
      cause: error,
      code: 'HTTP_ERROR',
      status: error.response.status,
    });
  }

  if (error instanceof TimeoutError) {
    return new ApiError('The request timed out.', { cause: error, code: 'TIMEOUT' });
  }

  if (error instanceof Error && error.name === 'AbortError') {
    return new ApiError('The request was cancelled.', { cause: error, code: 'ABORTED' });
  }

  return new ApiError('The network request failed.', { cause: error, code: 'NETWORK_ERROR' });
}
