import React from 'react';

import { render, cleanup } from '@testing-library/react';

import ProductItemList from './GoodsItemList';
import { Goods } from 'src/types/Goods';

describe('ProductItemList Component', () => {
  it('should render all goods items', () => {
    const mock_goods: Goods[] = [
      { id: 1, thumbnailImg: 'test_url', title: '맥쥬짠1', price: 10000 },
      { id: 2, thumbnailImg: 'test_url', title: '맥쥬짠2', price: 20000 },
      { id: 3, thumbnailImg: 'test_url', title: '맥쥬짠3', price: 30000 },
      { id: 4, thumbnailImg: 'test_url', title: '맥쥬짠4', price: 40000 },
    ];
    const wrapper = render(<ProductItemList goodsList={mock_goods} />);
    expect(wrapper.getByText('맥쥬짠1')).toBeInTheDocument();
    expect(wrapper.getByText('맥쥬짠2')).toBeInTheDocument();
    expect(wrapper.getByText('맥쥬짠3')).toBeInTheDocument();
    expect(wrapper.getByText('맥쥬짠4')).toBeInTheDocument();
  });

  afterAll(cleanup);
});
