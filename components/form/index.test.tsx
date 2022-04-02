/* global it expect */

import React from 'react';
import { render } from '@testing-library/react';

// Import component files
import Form from './index';

// Tests
describe('Form component', () => {
  it('renders to match snapshot', () => {
    const { baseElement } = render(<Form name="test" colour="blue" />);
    expect(baseElement).toMatchSnapshot();
  });
});
