import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  describe,
  expect,
  test,
} from 'vitest';
import { MockedProvider } from '@apollo/client/testing';
import { render } from '@testing-library/react';

import { getProductsQueryMock } from '../mocks/productsRequest';

import Products from '../../pages/Products';

describe('Products page', () => {
  test('should render page with graphql integration', async () => {
    const { container } = render(
      <MockedProvider mocks={getProductsQueryMock} addTypename={false}>
        <Router>
          <Products />
        </Router>
      </MockedProvider>,
    );

    // eslint-disable-next-line no-promise-executor-return
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(container).toMatchSnapshot();
  });
});
