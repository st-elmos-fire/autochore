/* global it expect */

import React from 'react';
import { render } from '@testing-library/react';

// Import component files
import Button from './index';

// Tests
describe('Button component', () => {
  it('renders to match snapshot', () => {
    const { baseElement } = render(<Button name="test" colour="blue" />);
    expect(baseElement).toMatchSnapshot();
  });
});
