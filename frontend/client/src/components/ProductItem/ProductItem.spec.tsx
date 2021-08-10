import React from 'react';

import { render, cleanup } from '@testing-library/react';

import ProductItem from './ProductItem';

describe('ProductItem Component', () => {
  it('should render "Hello world" title and price 1000', () => {
    const wrapper = render(<ProductItem title='Hello world' price={1000}></ProductItem>);
    expect(wrapper.getByText('Hello world')).toBeInTheDocument();
  });

  afterAll(cleanup);
});
