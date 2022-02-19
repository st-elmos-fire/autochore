/* global it expect */

import React from 'react';
import { render } from '@testing-library/react';

// Import component files
import ChoresList from './index';

// Tests
describe('ChoresList component', () => {
  it('renders to match snapshot', () => {
    const { baseElement } = render(<ChoresList name="test" colour="blue" />);
    expect(baseElement).toMatchSnapshot();
  });
});
