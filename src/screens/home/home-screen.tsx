import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Pressable, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { AppText, Card, Screen } from '@/components';
import { useLanguage } from '@/providers';
import { useTheme } from '@/theme';

import appIcon from '../../../assets/images/icon.png';

import type { Href } from 'expo-router';

type NavigationCardProps = {
  accent: string;
  description: string;
  href: Href;
  title: string;
};

function NavigationCard({ accent, description, href, title }: NavigationCardProps) {
  const { theme } = useTheme();

  return (
    <Link asChild href={href}>
      <Pressable accessibilityRole="link">
        {({ pressed }) => (
          <Card style={{ opacity: pressed ? 0.82 : 1 }}>
            <View style={{ flexDirection: 'row', gap: theme.spacing.md }}>
              <View
                style={{
                  backgroundColor: accent,
                  borderCurve: 'continuous',
                  borderRadius: theme.radii.md,
                  height: 48,
                  width: 10,
                }}
              />
              <View style={{ flex: 1, gap: theme.spacing.xs }}>
                <AppText variant="subtitle" weight="bold">
                  {title}
                </AppText>
                <AppText color="textMuted">{description}</AppText>
              </View>
              <AppText accessibilityElementsHidden color="primary" variant="subtitle">
                →
              </AppText>
            </View>
          </Card>
        )}
      </Pressable>
    </Link>
  );
}

export function HomeScreen() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const { mode, theme } = useTheme();

  return (
    <Screen>
      <Animated.View
        entering={FadeInDown.duration(260)}
        style={{
          alignItems: 'flex-start',
          gap: theme.spacing.md,
          paddingVertical: theme.spacing.lg,
        }}
      >
        <Image
          accessibilityLabel={t('common.appName')}
          contentFit="contain"
          source={appIcon}
          style={{ borderRadius: theme.radii.lg, height: 72, width: 72 }}
        />
        <AppText color="primary" variant="caption" weight="bold">
          {t('home.eyebrow')}
        </AppText>
        <AppText variant="display" weight="bold">
          {t('home.title')}
        </AppText>
        <AppText color="textMuted">{t('home.description')}</AppText>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.sm }}>
          <View
            style={{
              backgroundColor: theme.colors.secondary,
              borderRadius: theme.radii.pill,
              paddingHorizontal: theme.spacing.md,
              paddingVertical: theme.spacing.sm,
            }}
          >
            <AppText color="onSecondary" variant="caption" weight="medium">
              {t('home.themeLabel')}: {mode}
            </AppText>
          </View>
          <View
            style={{
              backgroundColor: theme.colors.secondary,
              borderRadius: theme.radii.pill,
              paddingHorizontal: theme.spacing.md,
              paddingVertical: theme.spacing.sm,
            }}
          >
            <AppText color="onSecondary" variant="caption" weight="medium">
              {t('home.languageLabel')}: {language.toUpperCase()}
            </AppText>
          </View>
        </View>
      </Animated.View>

      <View style={{ gap: theme.spacing.md }}>
        <NavigationCard
          accent={theme.colors.primary}
          description={t('home.apiDescription')}
          href="/example"
          title={t('home.apiTitle')}
        />
        <NavigationCard
          accent={theme.colors.success}
          description={t('home.settingsDescription')}
          href="/settings"
          title={t('home.settingsTitle')}
        />
        <NavigationCard
          accent={theme.colors.error}
          description={t('home.routeDescription')}
          href={{ pathname: '/user/[id]', params: { id: '1' } }}
          title={t('home.routeTitle')}
        />
      </View>
    </Screen>
  );
}
