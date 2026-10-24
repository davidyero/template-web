import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import type { RuleField } from './validation';

/**
 * Texto de una regla incumplida para un campo (`auth:rules.<campo>.<regla>`), con respaldo a
 * la regla genérica. Sirve igual para la validación local y para los `details` del backend.
 */
export const useRuleMessage = (): ((field: RuleField, rule?: string) => string | undefined) => {
  const { t, i18n } = useTranslation('auth');
  return useCallback(
    (field, rule) => {
      if (!rule) return undefined;
      const key = `rules.${field}.${rule}`;
      if (i18n.exists(key, { ns: 'auth' })) return t(key as 'rules.generic');
      return rule === 'required' ? t('rules.required') : t('rules.generic');
    },
    [t, i18n],
  );
};

/** `details` de un VALIDATION_ERROR → mapa campo → regla. */
export const detailsToRules = (
  details: { field: string; rule: string }[],
): Partial<Record<RuleField, string>> => Object.fromEntries(details.map((d) => [d.field, d.rule]));
