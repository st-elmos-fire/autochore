/* global it expect */

import React from 'react';
import { render } from '@testing-library/react';

// Import component files
import ChoreForm from './index';

// Tests
describe('ChoreForm component', () => {
  it('renders to match snapshot', () => {
    const { baseElement } = render(<ChoreForm name="test" colour="blue" />);
    expect(baseElement).toMatchSnapshot();
  });
});
