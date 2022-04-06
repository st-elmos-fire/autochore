/* global it expect */

import React from 'react';
import { render } from '@testing-library/react';

// Import component files
import LoginForm from './index';

// Tests
describe('LoginForm component', () => {
  it('renders to match snapshot', () => {
    const { baseElement } = render(<LoginForm name="test" colour="blue" />);
    expect(baseElement).toMatchSnapshot();
  });
});
