import React from 'react';
import {
  describe,
  expect,
  test,
  vi,
} from 'vitest';
import { render, screen } from '@testing-library/react';

import DropdownFilter from '../../components/DropdownFilter';

const mock = vi.fn();

describe('DropdownFilter component', () => {
  test('should render component with filters', () => {
    render(<DropdownFilter
      align="right"
      filters={[]}
      updateFiltersCriteria={mock}
    />);

    expect(screen.getByRole('button', { name: 'filter taxes' })).toBeInTheDocument();

    expect(screen.getByText('filters')).toBeInTheDocument();
    expect(screen.getByText('es_general_21')).toBeInTheDocument();
    expect(screen.getByText('es_general_10')).toBeInTheDocument();
    expect(screen.getByText('es_super-reduced_4')).toBeInTheDocument();
    expect(screen.getByText('fr_general_20')).toBeInTheDocument();
    expect(screen.getByText('fr_reduced_5.5')).toBeInTheDocument();

    expect(screen.getByText('clear')).toBeInTheDocument();
    expect(screen.getByText('apply')).toBeInTheDocument();
  });
});
