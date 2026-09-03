import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { AppText, Button, Card, ErrorState, LoadingIndicator, Screen } from '@/components';
import { useUserQuery } from '@/queries/use-user-query';
import { useTheme } from '@/theme';

export function ExampleScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { theme } = useTheme();
  const userQuery = useUserQuery(1);

  return (
    <Screen>
      <AppText color="textMuted">{t('example.description')}</AppText>

      {userQuery.isPending ? (
        <Card style={{ alignItems: 'center', paddingVertical: theme.spacing.xxl }}>
          <LoadingIndicator label={t('example.loading')} />
        </Card>
      ) : null}

      {userQuery.isError ? (
        <ErrorState
          description={t('example.errorDescription')}
          onRetry={() => {
            void userQuery.refetch();
          }}
          retryLabel={t('common.retry')}
          title={t('example.errorTitle')}
        />
      ) : null}

      {userQuery.data ? (
        <Animated.View entering={FadeIn.duration(220)}>
          <Card style={{ gap: theme.spacing.md }}>
            <AppText color="success" variant="caption" weight="bold">
              {t('example.successLabel')}
            </AppText>
            <AppText variant="title" weight="bold">
              {userQuery.data.name}
            </AppText>
            <View style={{ gap: theme.spacing.xs }}>
              <AppText color="textMuted" variant="caption">
                {t('example.email')}
              </AppText>
              <AppText>{userQuery.data.email}</AppText>
            </View>
            <View style={{ gap: theme.spacing.xs }}>
              <AppText color="textMuted" variant="caption">
                {t('example.company')}
              </AppText>
              <AppText>{userQuery.data.company.name}</AppText>
            </View>
            <Button
              onPress={() => {
                router.push({ pathname: '/user/[id]', params: { id: String(userQuery.data.id) } });
              }}
              variant="secondary"
            >
              {t('example.openUser')}
            </Button>
          </Card>
        </Animated.View>
      ) : null}
    </Screen>
  );
}
