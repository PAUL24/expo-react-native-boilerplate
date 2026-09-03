import { useTranslation } from 'react-i18next';
import { ActivityIndicator, View } from 'react-native';

import { useTheme } from '@/theme';

import { AppText } from './app-text';

type LoadingIndicatorProps = {
  label?: string;
};

export function LoadingIndicator({ label }: LoadingIndicatorProps) {
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <View accessibilityLiveRegion="polite" style={{ alignItems: 'center', gap: theme.spacing.md }}>
      <ActivityIndicator
        accessibilityLabel={label ?? t('common.loading')}
        color={theme.colors.primary}
      />
      <AppText color="textMuted">{label ?? t('common.loading')}</AppText>
    </View>
  );
}
