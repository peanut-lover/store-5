import React from 'react';
import { CartGoods } from 'src/types/CartGoods';
import CartGoodsListContainer from './CartGoodsListContainer/CartGoodsListContainer';
import CartNoData from './CartNoData/CartNoData';
import CartOrder from './CartOrder/CartOrder';

const mock: CartGoods[] = [
  {
    id: 1,
    thumbnailUrl: 'https://cdn-mart.baemin.com/sellergoods/desc/b55bb7a5-fb59-4a34-bc0b-6335e8cfcfcd.jpg',
    title: '든든 오뚜기 오쉐프_마요네즈',
    price: 34500,
    discountRate: 20,
    amount: 2,
    isSelected: true,
  },
  {
    id: 2,
    thumbnailUrl: 'https://cdn-mart.baemin.com/sellergoods/desc/b55bb7a5-fb59-4a34-bc0b-6335e8cfcfcd.jpg',
    title: '허약 마요네즈',
    price: 9000,
    discountRate: 0,
    amount: 1,
    isSelected: false,
  },
];

const Cart: React.FC = () => {
  const cartGoodsList: CartGoods[] = mock;

  if (cartGoodsList.length === 0) {
    return <CartNoData />;
  }

  return (
    <>
      <CartGoodsListContainer cartGoodsList={cartGoodsList} />
      <CartOrder cartGoodsList={cartGoodsList} />
    </>
  );
};

export default Cart;
