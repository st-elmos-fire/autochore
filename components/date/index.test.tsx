/* global it expect */

import React from 'react';
import { render } from '@testing-library/react';

// Import component files
import Date from './index';

// Tests
describe('Date component', () => {
  it('renders to match snapshot', () => {
    const { baseElement } = render(<Date name="test" colour="blue" />);
    expect(baseElement).toMatchSnapshot();
  });
});
