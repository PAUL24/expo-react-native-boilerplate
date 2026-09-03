import * as Haptics from 'expo-haptics';
import { ActivityIndicator, Pressable } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import { useTheme } from '@/theme';

import { AppText } from './app-text';

import type { ReactNode } from 'react';
import type { PressableProps, ViewStyle } from 'react-native';

type ButtonVariant = 'danger' | 'outline' | 'primary' | 'secondary';
type ButtonSize = 'lg' | 'md' | 'sm';

type ButtonProps = Omit<PressableProps, 'children' | 'style'> & {
  children: ReactNode;
  loading?: boolean;
  size?: ButtonSize;
  style?: ViewStyle;
  variant?: ButtonVariant;
};

const sizeStyles: Record<ButtonSize, ViewStyle> = {
  sm: { minHeight: 44, paddingHorizontal: 14, paddingVertical: 8 },
  md: { minHeight: 48, paddingHorizontal: 18, paddingVertical: 11 },
  lg: { minHeight: 56, paddingHorizontal: 22, paddingVertical: 15 },
};

export function Button({
  accessibilityLabel,
  children,
  disabled = false,
  loading = false,
  onPress,
  size = 'md',
  style,
  variant = 'primary',
  ...props
}: ButtonProps) {
  const { theme } = useTheme();
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  const isDisabled = disabled || loading;

  const variants: Record<ButtonVariant, ViewStyle> = {
    primary: { backgroundColor: theme.colors.primary },
    secondary: { backgroundColor: theme.colors.secondary },
    outline: {
      backgroundColor: 'transparent',
      borderColor: theme.colors.border,
      borderWidth: 1,
    },
    danger: { backgroundColor: theme.colors.error },
  };

  const textColor =
    variant === 'secondary' ? 'onSecondary' : variant === 'outline' ? 'text' : 'onPrimary';

  return (
    <Animated.View style={[animatedStyle, style]}>
      <Pressable
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="button"
        accessibilityState={{ busy: loading, disabled: isDisabled }}
        disabled={isDisabled}
        onPress={(event) => {
          if (process.env.EXPO_OS === 'ios') {
            void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }
          onPress?.(event);
        }}
        onPressIn={() => {
          // Reanimated shared values are intentionally mutable outside React state.
          // eslint-disable-next-line react-hooks/immutability
          scale.value = withSpring(0.97, { damping: 18, stiffness: 300 });
        }}
        onPressOut={() => {
          // Reanimated shared values are intentionally mutable outside React state.
          // eslint-disable-next-line react-hooks/immutability
          scale.value = withSpring(1, { damping: 18, stiffness: 300 });
        }}
        style={({ pressed }) => [
          {
            alignItems: 'center',
            borderCurve: 'continuous',
            borderRadius: theme.radii.md,
            flexDirection: 'row',
            gap: theme.spacing.sm,
            justifyContent: 'center',
            opacity: isDisabled ? 0.48 : pressed ? 0.88 : 1,
          },
          sizeStyles[size],
          variants[variant],
        ]}
        {...props}
      >
        {loading ? <ActivityIndicator color={theme.colors[textColor]} /> : null}
        <AppText color={textColor} weight="medium">
          {children}
        </AppText>
      </Pressable>
    </Animated.View>
  );
}
