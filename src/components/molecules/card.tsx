import { View } from 'react-native';

import { useTheme } from '@/theme';

import type { PropsWithChildren } from 'react';
import type { ViewProps } from 'react-native';

export function Card({ children, style, ...props }: PropsWithChildren<ViewProps>) {
  const { theme } = useTheme();

  return (
    <View
      style={[
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
          borderCurve: 'continuous',
          borderRadius: theme.radii.lg,
          borderWidth: 1,
          boxShadow: theme.shadows.card,
          padding: theme.spacing.lg,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}
