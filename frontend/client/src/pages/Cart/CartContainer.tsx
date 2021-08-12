import React from 'react';
import { CartGoods } from '@src/types/Goods';
import CartGoodsListContainer from './CartGoodsListContainer/CartGoodsListContainer';
import EmptyCart from './EmptyCart/EmptyCart';
import CartOrder from './CartOrder/CartOrder';
import PageHeader from '@src/components/PageHeader/PageHeader';
import Layout from './Layout/Layout';

interface Props {
  cartGoodsList: CartGoods[];
  onDeleteCartGoodsAll: (ids: number[]) => void;
  onChangeIsSelected: (id: number, isSelected: boolean) => void;
  onReviseIsSelected: (isSelected: boolean) => void;
  onChangeAmount: (id: number, amount: number) => void;
}

const CartContainer: React.FC<Props> = ({
  cartGoodsList,
  onDeleteCartGoodsAll,
  onChangeIsSelected,
  onReviseIsSelected,
  onChangeAmount,
}) => {
  // TODO: 결제 페이지로 이동
  const handleClickOrderButton = () => {};

  if (cartGoodsList.length === 0) {
    return <EmptyCart />;
  }

  return (
    <Layout
      pageHeader={<PageHeader>장바구니</PageHeader>}
      contentLeft={
        <CartGoodsListContainer
          cartGoodsList={cartGoodsList}
          onDeleteCartGoodsAll={onDeleteCartGoodsAll}
          onReviseIsSelected={onReviseIsSelected}
          onChangeIsSelected={onChangeIsSelected}
          onChangeAmount={onChangeAmount}
        />
      }
      contentRight={<CartOrder cartGoodsList={cartGoodsList} onClickOrderButton={handleClickOrderButton} />}
    />
  );
};

export default CartContainer;
