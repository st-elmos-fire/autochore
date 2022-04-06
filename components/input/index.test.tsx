/* global it expect */

import React from 'react';
import { render } from '@testing-library/react';

// Import component files
import Input from './index';

// Tests
describe('InputText component', () => {
  it('renders to match snapshot', () => {
    const { baseElement } = render(<Input name="test" type="text" />);
    expect(baseElement).toMatchSnapshot();
  });
});
