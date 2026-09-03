import { darkColors, lightColors } from './colors';
import { radii } from './radii';
import { shadows } from './shadows';
import { spacing } from './spacing';
import { typography } from './typography';

export const themes = {
  light: {
    colors: lightColors,
    radii,
    shadows,
    spacing,
    typography,
  },
  dark: {
    colors: darkColors,
    radii,
    shadows,
    spacing,
    typography,
  },
} as const;

export type ResolvedThemeMode = keyof typeof themes;
export type Theme = (typeof themes)[ResolvedThemeMode];
export type ThemeMode = ResolvedThemeMode | 'system';
