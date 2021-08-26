import React from 'react';

import { render, cleanup } from '@testing-library/react';

import SubCategoryList from './SubCategoryList';

describe('SubCategoryList Component', () => {
  it('should render "test1" "test2"', () => {
    const wrapper = render(<SubCategoryList list={['test1', 'test2']}></SubCategoryList>);
    expect(wrapper.getByText('test1')).toBeInTheDocument();
    expect(wrapper.getByText('test2')).toBeInTheDocument();
  });

  afterAll(cleanup);
});
