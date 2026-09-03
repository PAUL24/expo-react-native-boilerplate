import { fireEvent, render, screen } from '@testing-library/react-native';

import { TestAppWrapper } from '@/tests/test-app-wrapper';

import { Button } from './button';

describe('Button', () => {
  it('exposes accessible state and invokes its handler', async () => {
    const onPress = jest.fn();

    await render(<Button onPress={onPress}>Continue</Button>, { wrapper: TestAppWrapper });

    const button = screen.getByRole('button', { name: 'Continue' });
    fireEvent.press(button);

    expect(button).toHaveProp('accessibilityState', { busy: false, disabled: false });
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('prevents interaction and exposes a busy state while loading', async () => {
    const onPress = jest.fn();

    await render(
      <Button accessibilityLabel="Saving" loading onPress={onPress}>
        Save
      </Button>,
      { wrapper: TestAppWrapper },
    );

    const button = screen.getByRole('button', { name: 'Saving' });
    fireEvent.press(button);

    expect(button).toHaveProp('accessibilityState', { busy: true, disabled: true });
    expect(onPress).not.toHaveBeenCalled();
  });
});
