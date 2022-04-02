/* global it expect */

import React from 'react';
import { render } from '@testing-library/react';

// Import component files
import SiteHeader from './index';

// Tests
describe('SiteHeader component', () => {
  it('renders to match snapshot', () => {
    const { baseElement } = render(<SiteHeader name="test" colour="blue" />);
    expect(baseElement).toMatchSnapshot();
  });
});
