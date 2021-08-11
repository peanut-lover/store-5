import React from 'react';

import { render, cleanup } from '@testing-library/react';

import CartGoodsListItem from './CartGoodsListItem';
import { CartGoods } from '@src/types/CartGoods';

const mock: CartGoods = {
  id: 1,
  thumbnailUrl: 'https://cdn-mart.baemin.com/sellergoods/desc/b55bb7a5-fb59-4a34-bc0b-6335e8cfcfcd.jpg',
  title: '든든 오뚜기 오쉐프_마요네즈',
  price: 34500,
  discountRate: 20,
  amount: 2,
  stock: 5,
  isSelected: false,
};

describe('CartGoodsListItem Component', () => {
  it("should render cartGoods' infomations", () => {
    const wrapper = render(
      <CartGoodsListItem
        cartGoods={mock}
        onChangeAmount={() => {}}
        onChangeIsSelected={() => {}}
        onDeleteCartGoods={() => {}}
      />
    );
    expect(wrapper.getByText(mock.title)).toBeInTheDocument();
    expect(wrapper.getByText(mock.amount)).toBeInTheDocument();
  });

  afterAll(cleanup);
});
