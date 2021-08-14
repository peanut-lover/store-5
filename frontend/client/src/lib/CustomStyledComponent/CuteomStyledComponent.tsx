import React from 'react';
import { render } from '@testing-library/react';
import { styled } from './index';

describe('Custom Styled Component 테스트', () => {
  it('DOM rendering', () => {
    const H1 = styled('h1')`
      color: red;
    `;
    const wrapper = render(<H1>fdsf</H1>);
    const h1Element = wrapper.findByRole('h1');
    expect(h1Element).toBeInTheDocument();
  });
});
