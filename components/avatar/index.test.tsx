/* global it expect */

import React from 'react';
import { render } from '@testing-library/react';

// Import component files
import Avatar from './index';

// Tests
describe('Avatar component', () => {
  it('renders to match snapshot', () => {
    const { baseElement } = render(<Avatar name="test" colour="blue" />);
    expect(baseElement).toMatchSnapshot();
  });
});
