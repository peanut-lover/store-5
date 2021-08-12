import React from 'react';

import { render, cleanup } from '@testing-library/react';

import AutoSearchList from './AutoSearchList';

describe('AutoSearchList Component', () => {
  it('should render "test1" "test2"', () => {
    const wrapper = render(
      <AutoSearchList autoSearchList={['test1', 'test2']} onAddHistory={() => {}}></AutoSearchList>
    );
    expect(wrapper.getByText('test1')).toBeInTheDocument();
    expect(wrapper.getByText('test2')).toBeInTheDocument();
  });

  it('should render "문구"', () => {
    const wrapper = render(<AutoSearchList autoSearchList={['문구']} onAddHistory={() => {}}></AutoSearchList>);
    expect(wrapper.getByText('문구')).toBeInTheDocument();
  });

  it('should render "빈물건"', () => {
    const wrapper = render(
      <AutoSearchList autoSearchList={['테스트', '사줘요', '빈물건']} onAddHistory={() => {}}></AutoSearchList>
    );
    expect(wrapper.getByText('빈물건')).toBeInTheDocument();
  });

  afterAll(cleanup);
});
