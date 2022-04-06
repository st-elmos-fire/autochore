/* global it expect */

import React from 'react';
import { render } from '@testing-library/react';

// Import component files
import InputContainer from './index';

// Tests
describe('InputContainer component', () => {
  it('renders to match snapshot', () => {
    const { baseElement } = render(
      <InputContainer inputName="Test Name" labelText="Test Input">
        <input type="text" />
      </InputContainer>
    );
    expect(baseElement).toMatchSnapshot();
  });
});
