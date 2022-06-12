import { vi } from 'vitest';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import '@testing-library/jest-dom';

export const t = (key, params) => {
  if (key === 'key.with.params') {
    return `key.with.params.${params.param}`;
  }

  return key;
};

i18next.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  ns: ['common'],
  defaultNS: 'common',
  resources: {
    en: {
      common: {},
    },
  },
});

vi.mock('~/i18n', () => ({
  useTranslation: () => ({
    t,
    i18n: {
      language: 'en',
      changeLanguage: vi
        .fn()
        .mockImplementation((lang) => console.log(lang)),
    },
  }),
  withTranslation: () => (Component) => ({
    ...Component,
    defaultProps: { ...Component.defaultProps, t },
  }),
}));
