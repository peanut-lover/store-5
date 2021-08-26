import React from 'react';
import 'jest-styled-components';
import { render } from '@testing-library/react';
import { styled } from './index';

describe('Custom Styled Component 테스트', () => {
  let mockLatestStyle = '';
  window.CSSStyleSheet.prototype.insertRule = function (rule, index) {
    mockLatestStyle = rule;
    return 0;
  };

  it('DOM rendering', () => {
    type H1Props = {
      theme: {
        dark: string;
      };
    };

    const H1 = styled('h1')<H1Props>`
      color: red;
      background: ${(props) => props.theme.dark};
    `;

    const wrapper = render(<H1 theme={{ dark: '#000000' }}>fdsf</H1>);

    const $h1 = wrapper.container.querySelector('h1');
    if (!$h1) {
      throw 'Not found element';
    }

    expect(mockLatestStyle.includes('background: #000000')).toEqual(true);
    expect(mockLatestStyle.includes('color: red')).toEqual(true);
  });
});
