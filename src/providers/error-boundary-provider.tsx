import { ErrorBoundary } from 'react-error-boundary';
import { useTranslation } from 'react-i18next';

import { AppText, ErrorState, Screen } from '@/components';

import type { PropsWithChildren } from 'react';
import type { FallbackProps } from 'react-error-boundary';

function AppErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const { t } = useTranslation();

  return (
    <Screen contentContainerStyle={{ justifyContent: 'center' }}>
      <ErrorState
        description={t('errors.boundaryDescription')}
        onRetry={resetErrorBoundary}
        retryLabel={t('common.retry')}
        title={t('errors.boundaryTitle')}
      />
      {__DEV__ ? (
        <AppText color="textMuted" variant="caption">
          {t('errors.diagnostics')}: {error instanceof Error ? error.message : String(error)}
        </AppText>
      ) : null}
    </Screen>
  );
}

export function ErrorBoundaryProvider({ children }: PropsWithChildren) {
  return (
    <ErrorBoundary
      FallbackComponent={AppErrorFallback}
      onError={(error, info) => {
        if (__DEV__) {
          console.error('Unhandled render error', error, info.componentStack);
        }
      }}
    >
      {children}
    </ErrorBoundary>
  );
}
