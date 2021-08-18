import { GoodsBeforeOrder } from '@src/types/Goods';
import { getDiscountedPrice, getPriceText } from '@src/utils/price';
import React from 'react';
import styled from 'styled-components';

interface Props {
  orderGoods: GoodsBeforeOrder;
}

const OrderGoodsListItem: React.FC<Props> = ({ orderGoods }) => {
  const { goods, amount } = orderGoods;
  const { id, thumbnailUrl, title, price, discountRate } = goods;

  return (
    <Wrapper>
      <ThumbnailImg src={thumbnailUrl} />
      <GoodsTitle>{title}</GoodsTitle>
      <FlexColumn>
        <Amount>{amount}</Amount>
        <PriceText>{getPriceText(getDiscountedPrice(price, discountRate) * amount)}원</PriceText>
      </FlexColumn>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 1rem 0rem;
  display: flex;
  gap: 0.5rem;

  border-bottom: 1px dashed #ddd;
`;
const ThumbnailImg = styled.img`
  width: 8rem;
  height: 8rem;
`;
const GoodsTitle = styled.h2`
  flex: 1;
  padding: 0;
  margin: 0;
  font-size: 1.125rem;
  font-weight: normal;
`;
const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
`;
const PriceText = styled.span`
  font-size: 1rem;
  font-weight: bolder;
`;
const Amount = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3.5rem;
  height: 3rem;
  border: 1px solid #ddd;
`;

export default OrderGoodsListItem;
