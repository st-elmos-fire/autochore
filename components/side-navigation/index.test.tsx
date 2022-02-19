/* global it expect */

import React from 'react'
import { render } from '@testing-library/react';

// Import component files
import SideNavigation from './index'

// Tests
describe('SideNavigation component', () => {
  it('renders to match snapshot', () => {
    const { baseElement } = render(
      <SideNavigation name="test" colour="blue" />
    );
    expect(baseElement).toMatchSnapshot();
  });
});
