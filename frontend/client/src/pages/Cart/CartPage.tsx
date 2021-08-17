import { deleteCarts, getCarts, updateCart } from '@src/apis/cartAPI';
import PageHeader from '@src/components/PageHeader/PageHeader';
import { usePushHistory } from '@src/lib/CustomRouter';
import { CartGoods } from '@src/types/Goods';
import React, { useCallback, useState } from 'react';
import { useEffect } from 'react';
import CartGoodsListContainer from './CartGoodsListContainer/CartGoodsListContainer';
import CartOrder from './CartOrder/CartOrder';
import EmptyCart from './EmptyCart/EmptyCart';
import Layout from './Layout/Layout';

const CartPage: React.FC = () => {
  const pushHistory = usePushHistory();
  const [cartGoodsList, setCartGoodsList] = useState<CartGoods[]>([]);
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

  // TODO: 상품을 주문/결제 페이지에 전달하기
  const handleClickOrderButton = () => {
    pushHistory('/order');
  };

  useEffect(() => {
    const fetchCarts = async () => {
      const { result } = await getCarts();
      setCartGoodsList(result.map((cartGoods) => ({ ...cartGoods, isSelected: true })));
      setIsCartsFetched(true);
    };

    fetchCarts();
  }, []);

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
