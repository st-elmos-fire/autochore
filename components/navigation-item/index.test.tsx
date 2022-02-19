/* global it expect */

import React from 'react'
import { render } from '@testing-library/react';

// Import component files
import NavigationItem from './index'

// Tests
describe('NavigationItem component', () => {
  it('renders to match snapshot', () => {
    const { baseElement } = render(
      <NavigationItem name="test" colour="blue" />
    );
    expect(baseElement).toMatchSnapshot();
  });
});
