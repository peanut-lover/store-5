import React, { useCallback, useState } from 'react';
import { CartGoods } from '@src/types/CartGoods';
import CartContainer from './CartContainer';

const mock: CartGoods[] = [
  {
    id: 1,
    thumbnailUrl:
      'https://user-images.githubusercontent.com/20085849/128866958-900ad32a-cd32-4b97-be79-1dbbc9dcb02d.jpeg',
    title: '든든 오뚜기 오쉐프_마요네즈',
    price: 34500,
    discountRate: 20,
    amount: 2,
    stock: 5,
    isSelected: false,
  },
  {
    id: 2,
    thumbnailUrl:
      'https://user-images.githubusercontent.com/20085849/128866958-900ad32a-cd32-4b97-be79-1dbbc9dcb02d.jpeg',
    title: '허약 마요네즈',
    price: 9000,
    discountRate: 0,
    amount: 1,
    stock: 8,
    isSelected: false,
  },
];

// TODO: 실제 로컬 스토리지를 사용하여 cartGoodsList를 관리하기
const CartContainerWithLocalStorage: React.FC = () => {
  const [cartGoodsList, setCartGoodsList] = useState(mock);

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

export default CartContainerWithLocalStorage;
