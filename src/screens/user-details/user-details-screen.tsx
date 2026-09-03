import { useTranslation } from 'react-i18next';

import { AppText, Card, Screen } from '@/components';
import { useTheme } from '@/theme';

type UserDetailsScreenProps = {
  id?: string;
};

export function UserDetailsScreen({ id }: UserDetailsScreenProps) {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const numericId = Number(id);
  const isValid = Number.isInteger(numericId) && numericId > 0;

  return (
    <Screen contentContainerStyle={{ justifyContent: 'center' }}>
      <Card style={{ gap: theme.spacing.md }}>
        <AppText color="primary" variant="caption" weight="bold">
          {t('user.routeLabel')}
        </AppText>
        <AppText variant="title" weight="bold">
          {isValid ? t('user.title', { id: numericId }) : t('user.invalid')}
        </AppText>
        <AppText color="textMuted">{t('user.description')}</AppText>
      </Card>
    </Screen>
  );
}
