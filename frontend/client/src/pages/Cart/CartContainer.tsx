import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { CartGoods } from '@src/types/Goods';
import CartGoodsListContainer from './CartGoodsListContainer/CartGoodsListContainer';
import EmptyCart from './EmptyCart/EmptyCart';
import CartOrder from './CartOrder/CartOrder';

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
      <Header>장바구니</Header>
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
const LayoutLeft = styled.div`
  flex: 6;
`;
const LayoutRight = styled.div`
  flex: 4;
`;
const Header = styled.h1`
  margin: 0;
  padding: 0;
  font-size: 1.75rem;
  font-weight: bold;

  text-align: center;
  width: 100%;
  padding: 1.5rem 0;
  border-bottom: 4px solid black;
  margin-bottom: 2rem;
`;
const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 4rem;
`;

export default CartContainer;
