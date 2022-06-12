import React from 'react';
import { describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import { pagination, products } from '../mocks/productsRequest'

import ProductsTable from '../../components/ProductsTable';

const mock = vi.fn();

describe('ProductsTable component', () => {
  test('should render component with table and values into estructured cells', () => {
    render(<ProductsTable
      pagination={pagination}
      products={products}
      handleOrderByCriteria={mock}
    />);

    expect(screen.getByRole('banner')).toBeInTheDocument();

    expect(screen.getByRole('heading', { name: "products 953" })).toBeInTheDocument();

    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getAllByRole('rowgroup')).toHaveLength(2);

    expect(screen.getByRole('row', { name: "SKU article price tax stock" })).toBeInTheDocument();
    expect(screen.getByRole('row', { name: "2 Lightweight Wooden Coat 69.43 es_general_21 21" })).toBeInTheDocument();
    expect(screen.getByRole(
      'row',
      { name: "3 Lightweight Wooden Bench 9.45 es_super-reduced_4 19" }
    )).toBeInTheDocument();
    expect(screen.getByRole('row', { name: "4 Aerodynamic Aluminum Pants 81.76 es_reduced_10 19" })).toBeInTheDocument();

    expect(screen.getByRole('columnheader', { name: "SKU" })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: "article" })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: "price" })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: "tax" })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: "stock" })).toBeInTheDocument();

    expect(screen.getByRole('button', { name: "SKU" })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: "article" })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: "price" })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: "tax" })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: "stock" })).toBeInTheDocument();
  });
});
