import React from 'react';

import { render, cleanup } from '@testing-library/react';

import ProductItemList from './ProductItemList';
import { Product } from 'src/types/Product';

describe('ProductItemList Component', () => {
  it('should render all product items', () => {
    const mock_products: Product[] = [
      { id: 1, img: 'test_url', title: '맥쥬짠1', price: 10000 },
      { id: 2, img: 'test_url', title: '맥쥬짠2', price: 20000 },
      { id: 3, img: 'test_url', title: '맥쥬짠3', price: 30000 },
      { id: 4, img: 'test_url', title: '맥쥬짠4', price: 40000 },
    ];
    const wrapper = render(<ProductItemList products={mock_products} />);
    expect(wrapper.getByText('맥쥬짠1')).toBeInTheDocument();
    expect(wrapper.getByText('맥쥬짠2')).toBeInTheDocument();
    expect(wrapper.getByText('맥쥬짠3')).toBeInTheDocument();
    expect(wrapper.getByText('맥쥬짠4')).toBeInTheDocument();
  });

  afterAll(cleanup);
});
