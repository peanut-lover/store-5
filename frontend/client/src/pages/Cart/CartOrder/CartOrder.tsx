import React, { useMemo } from 'react';
import styled from 'styled-components';
import { CartGoods } from '@src/types/Goods';
import { getDiscountedPrice, getPriceText } from '@src/utils/price';
import HighlightedText from '@src/components/HighlightedText/HighlightedText';
import Button from '@src/components/Button/Button';

interface Props {
  cartGoodsList: CartGoods[];
  onClickOrderButton: () => void;
}

const CartOrder: React.FC<Props> = ({ cartGoodsList, onClickOrderButton }) => {
  const selectedCartGoodsList = useMemo(() => cartGoodsList.filter(({ isSelected }) => isSelected), [cartGoodsList]);
  const reducedPrice = useMemo(
    () =>
      selectedCartGoodsList.reduce(
        (prev, cartGoods) =>
          prev + cartGoods.amount * getDiscountedPrice(cartGoods.goods.price, cartGoods.goods.discountRate),
        0
      ),
    [selectedCartGoodsList]
  );

  // TODO: 배송비 정책 결정하고 대응 수정하기
  // 임시적으로 30000원 이상이면 배송비 0원, 아니면 2500원 부여
  const deliveryPrice = selectedCartGoodsList.length !== 0 && reducedPrice < 30000 ? 2500 : 0;

  return (
    <Wrapper>
      <Title>결제금액</Title>
      <SolidDivider />
      <PriceWrapper>
        <div>선택된 상품금액</div>
        <div>{getPriceText(reducedPrice)}원</div>
      </PriceWrapper>
      <PriceWrapper>
        <div>배송비</div>
        <div>{getPriceText(deliveryPrice)}원</div>
      </PriceWrapper>
      <DashedDivider />
      <PriceWrapper>
        <HighlightedText>합계</HighlightedText>
        <HighlightedText>{getPriceText(reducedPrice + deliveryPrice)}원</HighlightedText>
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

export default CartOrder;
