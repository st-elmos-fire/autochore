/* global it expect */

import React from 'react';
import { render } from '@testing-library/react';

// Import component files
import AppHeader from './index';

// Tests
describe('AppHeader component', () => {
  it('renders to match snapshot', () => {
    const { baseElement } = render(<AppHeader name="test" colour="blue" />);
    expect(baseElement).toMatchSnapshot();
  });
});
