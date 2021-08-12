import React, { useRef } from 'react';

import { render, cleanup } from '@testing-library/react';

import HeaderTop from './HeaderTop';

describe('HeaderTop Component', () => {
  it('should render name="기석님," 인사="안녕하세요!"', () => {
    const wrapper = render(<HeaderTop userName={'기석'} />);
    expect(wrapper.getByText('기석님,')).toBeInTheDocument();
    expect(wrapper.getByText('안녕하세요!')).toBeInTheDocument();
  });

  it('should render "로그인" when userName is empty', () => {
    const wrapper = render(<HeaderTop userName={''} />);
    expect(wrapper.getByText('로그인')).toBeInTheDocument();
  });

  it('should render "로그아웃" when userName is not null', () => {
    const wrapper = render(<HeaderTop userName={'바보'} />);
    expect(wrapper.getByText('로그아웃')).toBeInTheDocument();
  });

  afterAll(cleanup);
});
