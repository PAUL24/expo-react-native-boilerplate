import { ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '@/theme';

import type { PropsWithChildren } from 'react';
import type { ScrollViewProps } from 'react-native';

type ScreenProps = PropsWithChildren<ScrollViewProps>;

export function Screen({ children, contentContainerStyle, ...props }: ScreenProps) {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();

  return (
    <ScrollView
      automaticallyAdjustKeyboardInsets
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={[
        {
          flexGrow: 1,
          gap: theme.spacing.lg,
          paddingBottom: Math.max(insets.bottom, theme.spacing.lg),
          paddingHorizontal: theme.spacing.md,
          paddingTop: theme.spacing.md,
        },
        contentContainerStyle,
      ]}
      keyboardShouldPersistTaps="handled"
      style={{ backgroundColor: theme.colors.background }}
      {...props}
    >
      {children}
    </ScrollView>
  );
}
