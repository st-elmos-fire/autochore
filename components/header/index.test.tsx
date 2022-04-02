/* global it expect */

import React from 'react';
import { render } from '@testing-library/react';

// Import component files
import Header from './index';

// Tests
describe('Header component', () => {
  it('renders to match snapshot', () => {
    const { baseElement } = render(<Header name="test" colour="blue" />);
    expect(baseElement).toMatchSnapshot();
  });
});
