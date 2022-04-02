/* global it expect */

import React from 'react';
import { render } from '@testing-library/react';

// Import component files
import Input from './index';

// Tests
describe('Input component', () => {
  it('renders to match snapshot', () => {
    const { baseElement } = render(<Input name="test" colour="blue" />);
    expect(baseElement).toMatchSnapshot();
  });
});
