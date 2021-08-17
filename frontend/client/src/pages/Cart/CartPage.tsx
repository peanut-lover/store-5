import PageHeader from '@src/components/PageHeader/PageHeader';
import { usePushHistory } from '@src/lib/CustomRouter';
import { CartGoods } from '@src/types/Goods';
import React, { useCallback, useState } from 'react';
import CartGoodsListContainer from './CartGoodsListContainer/CartGoodsListContainer';
import CartOrder from './CartOrder/CartOrder';
import EmptyCart from './EmptyCart/EmptyCart';
import Layout from './Layout/Layout';

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

const CartPage: React.FC = () => {
  const pushHistory = usePushHistory();
  const [cartGoodsList, setCartGoodsList] = useState<CartGoods[]>(mock);

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

  // TODO: 상품을 주문/결제 페이지에 전달하기
  const handleClickOrderButton = () => {
    pushHistory('/order');
  };

  if (cartGoodsList.length === 0) {
    return <EmptyCart />;
  }

  return (
    <Layout
      pageHeader={<PageHeader>장바구니</PageHeader>}
      contentLeft={
        <CartGoodsListContainer
          cartGoodsList={cartGoodsList}
          onDeleteCartGoodsAll={handleDeleteCartGoodsAll}
          onReviseIsSelected={handleReviseIsSelected}
          onChangeIsSelected={handleChangeIsSelected}
          onChangeAmount={handleChangeAmount}
        />
      }
      contentRight={<CartOrder cartGoodsList={cartGoodsList} onClickOrderButton={handleClickOrderButton} />}
    />
  );
};

export default CartPage;
