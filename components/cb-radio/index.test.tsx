/* global it expect */

import React from 'react';
import { render } from '@testing-library/react';

// Import component files
import CbRadio from './index';

// Tests
describe('CbRadio component', () => {
  it('renders to match snapshot', () => {
    const { baseElement } = render(<CbRadio name="test" colour="blue" />);
    expect(baseElement).toMatchSnapshot();
  });
});
