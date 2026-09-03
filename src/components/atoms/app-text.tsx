import { Text } from 'react-native';

import { useTheme } from '@/theme';
import type { Theme } from '@/theme';

import type { TextProps, TextStyle } from 'react-native';

type TextVariant = 'body' | 'caption' | 'display' | 'subtitle' | 'title';
type TextColor = keyof Theme['colors'];

type AppTextProps = TextProps & {
  color?: TextColor;
  variant?: TextVariant;
  weight?: 'bold' | 'medium' | 'regular';
};

export function AppText({
  children,
  color = 'text',
  style,
  variant = 'body',
  weight = 'regular',
  ...props
}: AppTextProps) {
  const { theme } = useTheme();
  const textStyle: TextStyle = {
    color: theme.colors[color],
    fontFamily: theme.typography.family[weight],
    fontSize: theme.typography.size[variant],
    fontWeight: theme.typography.weight[weight],
    lineHeight: theme.typography.lineHeight[variant],
  };

  return (
    <Text allowFontScaling selectable style={[textStyle, style]} {...props}>
      {children}
    </Text>
  );
}
