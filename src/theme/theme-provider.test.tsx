import AsyncStorage from '@react-native-async-storage/async-storage';
import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import { Pressable, Text } from 'react-native';

import { ThemeProvider, useTheme } from './theme-provider';

function ThemeProbe() {
  const { mode, setMode } = useTheme();

  return (
    <Pressable accessibilityRole="button" onPress={() => setMode('light')}>
      <Text>{mode}</Text>
    </Pressable>
  );
}

describe('ThemeProvider', () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
  });

  it('hydrates and persists the selected preference', async () => {
    await AsyncStorage.setItem('app.theme-mode', JSON.stringify('dark'));
    await render(
      <ThemeProvider>
        <ThemeProbe />
      </ThemeProvider>,
    );

    await waitFor(() => expect(screen.getByText('dark')).toBeOnTheScreen());
    fireEvent.press(screen.getByRole('button'));

    await waitFor(async () => {
      await expect(AsyncStorage.getItem('app.theme-mode')).resolves.toBe(JSON.stringify('light'));
    });
  });
});
