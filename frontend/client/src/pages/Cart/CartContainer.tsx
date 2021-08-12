import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { CartGoods } from '@src/types/Goods';
import CartGoodsListContainer from './CartGoodsListContainer/CartGoodsListContainer';
import EmptyCart from './EmptyCart/EmptyCart';
import CartOrder from './CartOrder/CartOrder';
import PageHeader from '@src/components/PageHeader/PageHeader';

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
    <Wrapper>
      <PageHeader>장바구니</PageHeader>
      <ContentWrapper>
        <LayoutLeft>
          <CartGoodsListContainer
            cartGoodsList={cartGoodsList}
            onDeleteCartGoodsAll={onDeleteCartGoodsAll}
            onReviseIsSelected={onReviseIsSelected}
            onChangeIsSelected={onChangeIsSelected}
            onChangeAmount={onChangeAmount}
          />
        </LayoutLeft>
        <LayoutRight>
          <CartOrder cartGoodsList={cartGoodsList} onClickOrderButton={handleClickOrderButton} />
        </LayoutRight>
      </ContentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  font-family: initial;
  font-size: initial;
  margin: auto;
  width: 1024px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 4rem;
`;
const LayoutLeft = styled.div`
  flex: 6;
`;
const LayoutRight = styled.div`
  flex: 4;
`;

export default CartContainer;
