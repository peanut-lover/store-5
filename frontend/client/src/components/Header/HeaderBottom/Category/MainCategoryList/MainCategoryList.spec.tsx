import React from 'react';

import { render, cleanup } from '@testing-library/react';

import MainCategoryList from './MainCategoryList';

describe('MainCategoryList Component', () => {
  it('should render "test1", "test2"', () => {
    const wrapper = render(
      <MainCategoryList list={['test1', 'test2']} onHover={() => {}} hovered=''></MainCategoryList>
    );
    expect(wrapper.getByText('test1')).toBeInTheDocument();
    expect(wrapper.getByText('test2')).toBeInTheDocument();
  });

  it('should render 문구', () => {
    const wrapper = render(<MainCategoryList list={['문구']} onHover={() => {}} hovered=''></MainCategoryList>);
    expect(wrapper.getByText('문구')).toBeInTheDocument();
  });

  it('should render 단골상품', () => {
    const wrapper = render(
      <MainCategoryList list={['잘팔려요', '단골상품', '새상품']} onHover={() => {}} hovered=''></MainCategoryList>
    );
    expect(wrapper.getByText('단골상품')).toBeInTheDocument();
  });

  afterAll(cleanup);
});
