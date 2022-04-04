import React from 'react';
import { cleanup, render, RenderResult } from '@testing-library/react';

import Button from './index';

let renderResult: RenderResult;

describe('Button component', () => {
  beforeEach(() => {
    renderResult = render(<Button onClick={() => true}>Test</Button>);
  });

  afterEach(() => {
    cleanup();
  });

  it('should match the most recent snapshot', () => {
    expect(renderResult.baseElement).toMatchSnapshot();
  });
});
