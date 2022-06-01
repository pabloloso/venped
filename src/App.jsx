import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';

import './css/style.scss';

import Products from './pages/Products';
import PageNotFound from './pages/utility/PageNotFound';

function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto';
    window.scroll({ top: 0 });
    document.querySelector('html').style.scrollBehavior = '';
  }, [location.pathname]);

  useEffect(() => {
    fetch('http://vps-123eb2fc.vps.ovh.net/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
        query { fetchProducts { results(page: 1, perPage: 1) { id } } }
      `,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }, []);

  return (
    <Routes>
      <Route exact path="/" element={<Products />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
