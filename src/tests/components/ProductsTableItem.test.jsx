import React from 'react';
import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';

import ProductsTableItem from '../../components/ProductsTableItem';

describe('ProductsTableItem component', () => {
  test('should render component with values from product', () => {
    render(<ProductsTableItem
      id="2"
      price={69.43}
      stock={21}
      tax="es_general_21"
      title="Lightweight Wooden Coat"
    />);

    expect(screen.getByRole('row', { name: '2 Lightweight Wooden Coat 69.43 es_general_21 21' })).toBeInTheDocument();
  });
});
