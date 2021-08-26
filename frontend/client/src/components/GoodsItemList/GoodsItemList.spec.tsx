import React from 'react';

import { render, cleanup } from '@testing-library/react';

import ProductItemList from './GoodsItemList';
import { Goods } from 'src/types/Goods';
import { RecoilRoot } from 'recoil';

describe('ProductItemList Component', () => {
  it('should render all goods items', () => {
    const mock_goods: Goods[] = [
      { id: 1, thumbnailUrl: 'test_url', title: '맥쥬짠1', price: 10000, discountRate: 0 },
      { id: 2, thumbnailUrl: 'test_url', title: '맥쥬짠2', price: 20000, discountRate: 0 },
      { id: 3, thumbnailUrl: 'test_url', title: '맥쥬짠3', price: 30000, discountRate: 0 },
      { id: 4, thumbnailUrl: 'test_url', title: '맥쥬짠4', price: 40000, discountRate: 0 },
    ];
    const wrapper = render(
      <RecoilRoot>
        <ProductItemList goodsList={mock_goods} />
      </RecoilRoot>
    );
    expect(wrapper.getByText('맥쥬짠1')).toBeInTheDocument();
    expect(wrapper.getByText('맥쥬짠2')).toBeInTheDocument();
    expect(wrapper.getByText('맥쥬짠3')).toBeInTheDocument();
    expect(wrapper.getByText('맥쥬짠4')).toBeInTheDocument();
  });

  afterAll(cleanup);
});
