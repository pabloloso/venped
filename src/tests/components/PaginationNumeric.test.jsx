import React from 'react';
import {
  describe,
  expect,
  test,
  vi,
} from 'vitest';
import { render, screen } from '@testing-library/react';

import { pagination } from '../mocks/productsRequest';

import PaginationNumeric from '../../components/PaginationNumeric';

const mock = vi.fn();

describe('PaginationNumeric component', () => {
  test('should render component with buttons from pagination and list', () => {
    render(<PaginationNumeric
      pagination={pagination}
      handleChangeCurrentPageCriteria={mock}
    />);

    expect(screen.getByRole('navigation', { name: 'Navigation' })).toBeInTheDocument();

    expect(screen.getByRole('button', { name: 'previous' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '19' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '20' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '21' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '96' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'next' })).toBeInTheDocument();

    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });
});
