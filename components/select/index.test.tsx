/* global it expect */

import React from 'react';
import { render } from '@testing-library/react';

// Import component files
import Select from './index';

// Tests
describe('Select component', () => {
  it('renders to match snapshot', () => {
    const { baseElement } = render(<Select name="test" colour="blue" />);
    expect(baseElement).toMatchSnapshot();
  });
});
