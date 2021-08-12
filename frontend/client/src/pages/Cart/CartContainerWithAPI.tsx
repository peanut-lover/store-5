import React, { useState, useCallback } from 'react';
import { CartGoods } from '@src/types/CartGoods';
import CartContainer from './CartContainer';

// TODO: 실제 API를 호출하여 cartGoodsList를 관리하기
const CartContainerWithAPI: React.FC = () => {
  const [cartGoodsList, setCartGoodsList] = useState<CartGoods[]>([]);

  const handleDeleteCartGoodsAll = useCallback(
    (ids: number[]) => {
      const filteredCartGoodsList = cartGoodsList.filter(({ id }) => !ids.includes(id));
      setCartGoodsList(filteredCartGoodsList);
    },
    [cartGoodsList, setCartGoodsList]
  );

  const handleChangeAmount = useCallback(
    (id: number, amount: number) => {
      const changedCartGoodsList = cartGoodsList.map((cartGoods) => {
        if (cartGoods.id === id) return { ...cartGoods, amount };
        return cartGoods;
      });
      setCartGoodsList(changedCartGoodsList);
    },
    [cartGoodsList, setCartGoodsList]
  );

  const handleReviseIsSelected = useCallback(
    (isSelected: boolean) => {
      const changedCartGoodsList = cartGoodsList.map((cartGoods) => ({ ...cartGoods, isSelected }));
      setCartGoodsList(changedCartGoodsList);
    },
    [cartGoodsList, setCartGoodsList]
  );

  const handleChangeIsSelected = useCallback(
    (id: number, isSelected: boolean) => {
      const changedCartGoodsList = cartGoodsList.map((cartGoods) => {
        if (cartGoods.id === id) return { ...cartGoods, isSelected };
        return cartGoods;
      });
      setCartGoodsList(changedCartGoodsList);
    },
    [cartGoodsList, setCartGoodsList]
  );

  return (
    <CartContainer
      cartGoodsList={cartGoodsList}
      onChangeAmount={handleChangeAmount}
      onChangeIsSelected={handleChangeIsSelected}
      onDeleteCartGoodsAll={handleDeleteCartGoodsAll}
      onReviseIsSelected={handleReviseIsSelected}
    />
  );
};

export default CartContainerWithAPI;
