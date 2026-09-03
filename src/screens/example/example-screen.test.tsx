import { fireEvent, render, screen } from '@testing-library/react-native';

import { useUserQuery } from '@/queries/use-user-query';
import { TestAppWrapper } from '@/tests/test-app-wrapper';

import { ExampleScreen } from './example-screen';

const mockPush = jest.fn();

jest.mock('expo-router', () => ({
  useRouter: () => ({ push: mockPush }),
}));

jest.mock('@/queries/use-user-query', () => ({
  useUserQuery: jest.fn(),
}));

const mockedUseUserQuery = jest.mocked(useUserQuery);

describe('ExampleScreen', () => {
  beforeEach(() => {
    mockedUseUserQuery.mockReset();
    mockPush.mockReset();
  });

  it('renders the loading state', async () => {
    mockedUseUserQuery.mockReturnValue({
      data: undefined,
      isError: false,
      isPending: true,
    } as unknown as ReturnType<typeof useUserQuery>);

    await render(<ExampleScreen />, { wrapper: TestAppWrapper });

    expect(screen.getByText('Loading a validated user…')).toBeOnTheScreen();
  });

  it('renders the safe error state and retries', async () => {
    const refetch = jest.fn();
    mockedUseUserQuery.mockReturnValue({
      data: undefined,
      isError: true,
      isPending: false,
      refetch,
    } as unknown as ReturnType<typeof useUserQuery>);

    await render(<ExampleScreen />, { wrapper: TestAppWrapper });
    fireEvent.press(screen.getByRole('button', { name: 'Try again' }));

    expect(screen.getByText('We couldn’t load the example')).toBeOnTheScreen();
    expect(refetch).toHaveBeenCalledTimes(1);
  });

  it('renders validated data and navigates to its dynamic route', async () => {
    mockedUseUserQuery.mockReturnValue({
      data: {
        company: { name: 'Romaguera-Crona' },
        email: 'sincere@april.biz',
        id: 1,
        name: 'Leanne Graham',
      },
      isError: false,
      isPending: false,
    } as unknown as ReturnType<typeof useUserQuery>);

    await render(<ExampleScreen />, { wrapper: TestAppWrapper });
    fireEvent.press(screen.getByRole('button', { name: 'Open dynamic user route' }));

    expect(screen.getByText('VALIDATED RESPONSE')).toBeOnTheScreen();
    expect(screen.getByText('Leanne Graham')).toBeOnTheScreen();
    expect(mockPush).toHaveBeenCalledWith({ pathname: '/user/[id]', params: { id: '1' } });
  });
});
