import React from 'react';

import { render, cleanup } from '@testing-library/react';

import ProductSection from './ProductSection';
import { Product } from 'src/types/Product';

describe('ProductSection Component', () => {
  it('should render with Product Section Title', () => {
    const mock_products: Product[] = [
      { id: 1, img: 'test_url', title: '맥쥬짠1', price: 10000 },
      { id: 2, img: 'test_url', title: '맥쥬짠2', price: 20000 },
      { id: 3, img: 'test_url', title: '맥쥬짠3', price: 30000 },
      { id: 4, img: 'test_url', title: '맥쥬짠4', price: 40000 },
    ];
    const wrapper = render(<ProductSection sectionTitle='잘나가요' products={mock_products} />);
    expect(wrapper.getByText('잘나가요')).toBeInTheDocument();
  });

  afterAll(cleanup);
});
