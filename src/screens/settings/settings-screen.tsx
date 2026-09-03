import { useTranslation } from 'react-i18next';
import { Pressable, View } from 'react-native';

import { AppText, Card, Screen } from '@/components';
import { useLanguage } from '@/providers';
import { useTheme } from '@/theme';
import type { ThemeMode } from '@/theme';
import type { Language } from '@/translations';

import type { ReactNode } from 'react';

type SelectionOption<T extends string> = {
  label: ReactNode;
  value: T;
};

type SelectionGroupProps<T extends string> = {
  onChange: (value: T) => void;
  options: readonly SelectionOption<T>[];
  value: T;
};

function SelectionGroup<T extends string>({ onChange, options, value }: SelectionGroupProps<T>) {
  const { theme } = useTheme();

  return (
    <View accessibilityRole="radiogroup" style={{ gap: theme.spacing.sm }}>
      {options.map((option) => {
        const selected = option.value === value;

        return (
          <Pressable
            accessibilityRole="radio"
            accessibilityState={{ checked: selected }}
            key={option.value}
            onPress={() => onChange(option.value)}
            style={({ pressed }) => ({
              alignItems: 'center',
              backgroundColor: selected ? theme.colors.secondary : theme.colors.background,
              borderColor: selected ? theme.colors.primary : theme.colors.border,
              borderCurve: 'continuous',
              borderRadius: theme.radii.md,
              borderWidth: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              minHeight: 48,
              opacity: pressed ? 0.82 : 1,
              paddingHorizontal: theme.spacing.md,
              paddingVertical: theme.spacing.sm,
            })}
          >
            <AppText color={selected ? 'onSecondary' : 'text'} weight="medium">
              {option.label}
            </AppText>
            <AppText color={selected ? 'primary' : 'textMuted'} weight="bold">
              {selected ? '●' : '○'}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
}

export function SettingsScreen() {
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();
  const { mode, setMode, theme } = useTheme();
  const themeOptions: readonly SelectionOption<ThemeMode>[] = [
    { label: t('settings.system'), value: 'system' },
    { label: t('settings.light'), value: 'light' },
    { label: t('settings.dark'), value: 'dark' },
  ];
  const languageOptions: readonly SelectionOption<Language>[] = [
    { label: t('settings.english'), value: 'en' },
    { label: t('settings.french'), value: 'fr' },
  ];

  return (
    <Screen>
      <AppText color="textMuted">{t('settings.description')}</AppText>
      <Card style={{ gap: theme.spacing.lg }}>
        <View style={{ gap: theme.spacing.xs }}>
          <AppText variant="subtitle" weight="bold">
            {t('settings.themeTitle')}
          </AppText>
          <AppText color="textMuted">{t('settings.themeDescription')}</AppText>
        </View>
        <SelectionGroup onChange={setMode} options={themeOptions} value={mode} />
      </Card>
      <Card style={{ gap: theme.spacing.lg }}>
        <View style={{ gap: theme.spacing.xs }}>
          <AppText variant="subtitle" weight="bold">
            {t('settings.languageTitle')}
          </AppText>
          <AppText color="textMuted">{t('settings.languageDescription')}</AppText>
        </View>
        <SelectionGroup
          onChange={(nextLanguage) => {
            void setLanguage(nextLanguage);
          }}
          options={languageOptions}
          value={language}
        />
      </Card>
    </Screen>
  );
}
