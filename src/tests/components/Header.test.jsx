import React from 'react';
import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';

import Header from '../../components/Header';

describe('Header component', () => {
  test('should render component with options and banner', () => {
    render(<Header />);

    expect(screen.getByRole('option', { name: 'EN' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'ES' })).toBeInTheDocument();

    expect(screen.getByRole('combobox')).toBeInTheDocument();

    expect(screen.getByRole('banner')).toBeInTheDocument();
  });
});
