import React from 'react';

import { render, cleanup } from '@testing-library/react';

import SubCategoryList from './SubCategoryList';

describe('SubCategoryList Component', () => {
  it('should render "test1" "test2"', () => {
    const wrapper = render(
      <SubCategoryList list={{ 서브1: ['test1', 'test2'], 서브2: ['sub1', 'sub2'] }} hovered='서브1'></SubCategoryList>
    );
    expect(wrapper.getByText('test1')).toBeInTheDocument();
    expect(wrapper.getByText('test2')).toBeInTheDocument();
  });

  it('should render "문방구템"', () => {
    const wrapper = render(<SubCategoryList list={{ 문구: ['문방구템'] }} hovered='문구'></SubCategoryList>);
    expect(wrapper.getByText('문방구템')).toBeInTheDocument();
  });

  it('should render "연필"', () => {
    const wrapper = render(
      <SubCategoryList list={{ 상품: ['노트', '책가방', '연필'] }} hovered='상품'></SubCategoryList>
    );
    expect(wrapper.getByText('연필')).toBeInTheDocument();
  });

  afterAll(cleanup);
});
