import React from 'react';
import { useState } from 'react';
import { CartGoods } from 'src/types/CartGoods';
import styled from 'styled-components';
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
    stock: 5,
    isSelected: false,
  },
  {
    id: 2,
    thumbnailUrl: 'https://cdn-mart.baemin.com/sellergoods/desc/b55bb7a5-fb59-4a34-bc0b-6335e8cfcfcd.jpg',
    title: '허약 마요네즈',
    price: 9000,
    discountRate: 0,
    amount: 1,
    stock: 8,
    isSelected: false,
  },
];

const Cart: React.FC = () => {
  const [cartGoodsList, setCartGoodsList] = useState(mock);

  // TODO: localStorage, API 분기 처리하는 계층을 두기
  const handleDeleteCartGoodsAll = (ids: number[]) => {
    setCartGoodsList(cartGoodsList.filter(({ id }) => !ids.includes(id)));
  };
  const handleChangeAmount = (id: number, amount: number) => {
    setCartGoodsList(
      cartGoodsList.map((cartGoods) => {
        if (cartGoods.id === id) return { ...cartGoods, amount };
        return cartGoods;
      })
    );
  };
  const handleChangeAllIsSelected = (isSelected: boolean) => {
    setCartGoodsList(cartGoodsList.map((cartGoods) => ({ ...cartGoods, isSelected })));
  };
  const handleChangeIsSelected = (id: number, isSelected: boolean) => {
    setCartGoodsList(
      cartGoodsList.map((cartGoods) => {
        if (cartGoods.id === id) return { ...cartGoods, isSelected };
        return cartGoods;
      })
    );
  };

  // TODO: 결제 페이지로 이동
  const handleClickOrderButton = () => {};

  if (cartGoodsList.length === 0) {
    return <CartNoData />;
  }

  return (
    <>
      <CartGoodsListContainer
        cartGoodsList={cartGoodsList}
        onDeleteCartGoodsAll={handleDeleteCartGoodsAll}
        onChangeAllIsSelected={handleChangeAllIsSelected}
        onChangeIsSelected={handleChangeIsSelected}
        onChangeAmount={handleChangeAmount}
      />
      <CartOrder cartGoodsList={cartGoodsList} onClickOrderButton={handleClickOrderButton} />
    </>
  );
};

export default Cart;
