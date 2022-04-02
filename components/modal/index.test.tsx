/* global it expect */

import React from 'react';
import { render } from '@testing-library/react';

// Import component files
import Modal from './index';

// Tests
describe('Modal component', () => {
  it('renders to match snapshot', () => {
    const { baseElement } = render(<Modal name="test" colour="blue" />);
    expect(baseElement).toMatchSnapshot();
  });
});
