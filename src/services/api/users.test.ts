import { api } from './client';
import { ApiError } from './errors';
import { getUser } from './users';

jest.mock('./client', () => ({
  api: { get: jest.fn() },
}));

const mockedGet = jest.mocked(api.get);

describe('getUser', () => {
  beforeEach(() => {
    mockedGet.mockReset();
  });

  it('requests and validates a user through the API client', async () => {
    const payload = {
      company: { name: 'Romaguera-Crona' },
      email: 'sincere@april.biz',
      id: 1,
      name: 'Leanne Graham',
    };
    mockedGet.mockResolvedValue(payload);

    await expect(getUser(1)).resolves.toEqual(payload);
    expect(mockedGet).toHaveBeenCalledWith('users/1', { signal: undefined });
  });

  it('normalizes an invalid response without leaking schema details', async () => {
    mockedGet.mockResolvedValue({ id: 'wrong' });

    await expect(getUser(1)).rejects.toMatchObject<Partial<ApiError>>({
      code: 'INVALID_RESPONSE',
      message: 'The API returned an unexpected response.',
    });
  });
});
