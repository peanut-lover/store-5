import React, { useCallback, useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';

import CartOrder from './CartOrder/CartOrder';
import EmptyCart from './EmptyCart/EmptyCart';
import Layout from './Layout/Layout';
import PageHeader from '@src/components/PageHeader/PageHeader';
import CartGoodsListContainer from './CartGoodsListContainer/CartGoodsListContainer';

import usePushToOrderPage from '@src/hooks/usePushToOrderPage';
import composeComponent from '@src/utils/composeComponent';
import withScrollToTopOnMount from '@src/utils/withScrollToTopOnMount';
import withLoggedIn from '@src/utils/withLoggedIn';
import { cartState } from '@src/recoil/cartState';
import { deleteCarts, getCarts, updateCart } from '@src/apis/cartAPI';

const CartPage: React.FC = () => {
  const pushToOrderPage = usePushToOrderPage();
  const [cartGoodsList, setCartGoodsList] = useRecoilState(cartState);
  const [isCartsFetched, setIsCartsFetched] = useState(false);

  const handleDeleteCartGoodsAll = useCallback(
    async (ids: number[]) => {
      await deleteCarts(ids);
      const filteredCartGoodsList = cartGoodsList.filter(({ id }) => !ids.includes(id));
      setCartGoodsList(filteredCartGoodsList);
    },
    [cartGoodsList, setCartGoodsList]
  );

  const handleChangeAmount = useCallback(
    async (id: number, amount: number) => {
      const { result } = await updateCart(id, { amount });
      const changedCartGoodsList = cartGoodsList.map((cartGoods) => {
        if (cartGoods.id === id) return { ...cartGoods, amount: result.amount };
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
        if (cartGoods.id === id) {
          return { ...cartGoods, isSelected };
        } else {
          return cartGoods;
        }
      });
      setCartGoodsList(changedCartGoodsList);
    },
    [cartGoodsList, setCartGoodsList]
  );

  const handleClickOrderButton = () => {
    const filteredCartGoodsList = cartGoodsList.filter((cartGoods) => cartGoods.isSelected);
    const cartIds = filteredCartGoodsList.map((cartGoods) => cartGoods.id);
    pushToOrderPage(filteredCartGoodsList, cartIds);
  };

  useEffect(() => {
    const fetchCarts = async () => {
      const { result } = await getCarts();
      setCartGoodsList(result.map((cartGoods) => ({ ...cartGoods, isSelected: true })));
      setIsCartsFetched(true);
    };

    fetchCarts();
  }, []);

  if (!isCartsFetched) {
    return null;
  }

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

export default composeComponent(withLoggedIn, withScrollToTopOnMount)(CartPage);
