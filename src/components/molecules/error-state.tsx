import { View } from 'react-native';

import { useTheme } from '@/theme';

import { AppText } from '../atoms/app-text';
import { Button } from '../atoms/button';

type ErrorStateProps = {
  description: string;
  onRetry?: () => void;
  retryLabel?: string;
  title: string;
};

export function ErrorState({ description, onRetry, retryLabel, title }: ErrorStateProps) {
  const { theme } = useTheme();

  return (
    <View
      accessibilityLiveRegion="assertive"
      style={{
        backgroundColor: theme.colors.errorSurface,
        borderCurve: 'continuous',
        borderRadius: theme.radii.lg,
        gap: theme.spacing.md,
        padding: theme.spacing.lg,
      }}
    >
      <AppText color="error" variant="subtitle" weight="bold">
        {title}
      </AppText>
      <AppText color="textMuted">{description}</AppText>
      {onRetry && retryLabel ? (
        <Button onPress={onRetry} variant="danger">
          {retryLabel}
        </Button>
      ) : null}
    </View>
  );
}
