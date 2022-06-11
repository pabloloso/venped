import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';

import { DEFAULT_LANGUAGE } from './constants/language';

import globalEn from './translations/en/global.json';
import globalEs from './translations/es/global.json';

import App from './App';

i18next.init({
  interpolation: { escapeValue: false },
  lng: DEFAULT_LANGUAGE,
  resources: {
    en: {
      global: globalEn,
    },
    es: {
      global: globalEs,
    },
  },
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: `${import.meta.env.VITE_TEST_BASE_URL}/graphql`,
  }),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <I18nextProvider i18n={i18next}>
        <Router>
          <App />
        </Router>
      </I18nextProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
