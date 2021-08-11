import React, { useMemo } from 'react';
import styled from 'styled-components';
import { CartGoods } from '@src/types/CartGoods';

interface Props {
  cartGoodsList: CartGoods[];
  onClickOrderButton: () => void;
}

// TODO: 배송비 정책 결정하고 대응 수정하기
const CartOrder: React.FC<Props> = ({ cartGoodsList, onClickOrderButton }) => {
  const selectedCartGoodsList = useMemo(() => cartGoodsList.filter(({ isSelected }) => isSelected), [cartGoodsList]);
  const reducedPrice = useMemo(
    () => selectedCartGoodsList.reduce((prev, cartGoods) => prev + cartGoods.amount * cartGoods.price, 0),
    [selectedCartGoodsList]
  );
  const deliveryPrice = 0;

  return (
    <Wrapper>
      <Title>결제금액</Title>
      <SolidDivider />
      <PriceWrapper>
        <div>선택된 상품금액</div>
        <div>{reducedPrice}원</div>
      </PriceWrapper>
      <PriceWrapper>
        <div>배송비</div>
        <div>{deliveryPrice}원</div>
      </PriceWrapper>
      <DashedDivider />
      <PriceWrapper>
        <StrongText>합계</StrongText>
        <StrongText>{reducedPrice + deliveryPrice}원</StrongText>
      </PriceWrapper>
      <DashedDivider />
      <Button onClick={onClickOrderButton} disabled={selectedCartGoodsList.length === 0}>
        주문하기{selectedCartGoodsList.length > 0 && ` (${selectedCartGoodsList.length}개)`}
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  border: 1px solid #ddd;
  padding: 2rem;
`;

const Title = styled.h2`
  padding: 0;
  margin: 0;
  font-size: 1.375rem;
  font-weight: bolder;
`;

const SolidDivider = styled.hr`
  width: 100%;
  border: none;
  background-color: #ddd;
  margin: 1rem 0;
  height: 2px;
`;

const DashedDivider = styled.hr`
  width: 100%;
  border: none;
  margin: 1rem 0;
  border-bottom: 1px dashed #ddd;
`;

const PriceWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StrongText = styled.strong`
  position: relative;
  font-size: 1.375rem;
  font-weight: bolder;

  ::after {
    position: absolute;
    content: '';
    left: 0;
    right: 0;
    bottom: 0;
    height: 40%;
    background-color: rgba(42, 193, 188, 0.5);
  }
`;

const Button = styled.button`
  cursor: pointer;
  color: white;
  border: none;
  background-color: rgb(42, 193, 188);
  margin: 0;
  padding: 1.25rem;
  font-size: 1.125rem;
  font-weight: bolder;

  transition: 0.2s linear;

  :hover {
    background-color: rgba(42, 193, 188, 0.75);
  }

  :disabled {
    cursor: initial;
    color: #ddd;
    background-color: #eee;
  }
`;

export default CartOrder;
