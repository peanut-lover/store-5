import { deleteCarts, getCarts, updateCart } from '@src/apis/cartAPI';
import PageHeader from '@src/components/PageHeader/PageHeader';
import usePushToOrderPage from '@src/hooks/usePushToOrderPage';
import { usePushHistory } from '@src/lib/CustomRouter';
import { cartState } from '@src/recoil/cartState';
import { CartGoods } from '@src/types/Goods';
import composeComponent from '@src/utils/composeComponent';
import withLoggedIn from '@src/utils/withLoggedIn';
import withScrollToTopOnMount from '@src/utils/withScrollToTopOnMount';
import React, { useCallback, useState } from 'react';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import CartGoodsListContainer from './CartGoodsListContainer/CartGoodsListContainer';
import CartOrder from './CartOrder/CartOrder';
import EmptyCart from './EmptyCart/EmptyCart';
import Layout from './Layout/Layout';

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
        if (cartGoods.id === id) return { ...cartGoods, isSelected };
        return cartGoods;
      });
      setCartGoodsList(changedCartGoodsList);
    },
    [cartGoodsList, setCartGoodsList]
  );

  const handleClickOrderButton = () => {
    const filteredCartGoodsList = cartGoodsList.filter((cartGoods) => cartGoods.isSelected);
    const cartIds = cartGoodsList.map((cartGoods) => cartGoods.id);
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
