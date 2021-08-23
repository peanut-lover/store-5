import React from 'react';

import { render, cleanup } from '@testing-library/react';

import GoodsSection from './GoodsSection';
import { Goods } from 'src/types/Goods';
import { RecoilRoot } from 'recoil';

describe('GoodsSection Component', () => {
  it('should render with Goods Section Title', () => {
    const mock_goods: Goods[] = [
      { id: 1, thumbnailUrl: 'test_url', title: '맥쥬짠1', price: 10000, discountRate: 0 },
      { id: 2, thumbnailUrl: 'test_url', title: '맥쥬짠2', price: 20000, discountRate: 0 },
      { id: 3, thumbnailUrl: 'test_url', title: '맥쥬짠3', price: 30000, discountRate: 0 },
      { id: 4, thumbnailUrl: 'test_url', title: '맥쥬짠4', price: 40000, discountRate: 0 },
    ];
    const wrapper = render(
      <RecoilRoot>
        <GoodsSection sectionTitle='잘나가요' goodsList={mock_goods} />
      </RecoilRoot>
    );
    expect(wrapper.getByText('잘나가요')).toBeInTheDocument();
  });

  afterAll(cleanup);
});
