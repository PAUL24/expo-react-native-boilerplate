import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { Button, ErrorState, Screen } from '@/components';

export function NotFoundScreen() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <Screen contentContainerStyle={{ justifyContent: 'center' }}>
      <ErrorState description={t('errors.notFoundDescription')} title={t('errors.notFoundTitle')} />
      <Button onPress={() => router.replace('/')} variant="secondary">
        {t('common.backHome')}
      </Button>
    </Screen>
  );
}
