import React from 'react';
import styled from 'styled-components';
import { getDiscountedPrice, getPriceText } from '@src/utils/price';
import { DetailGoods } from '@src/types/Goods';

export interface GoodsInfoProps {
  goods: DetailGoods;
}

// TODO: deliveryFee, deliveryDetail는 상품 등록 이후 기본값 삭제?
const GoodsInfo: React.FC<GoodsInfoProps> = ({
  goods: { title, price, discountRate, deliveryFee = 0, deliveryDetail = '' },
}) => {
  const salePrice = getDiscountedPrice(price, discountRate);

  return (
    <>
      <GoodsTitle>{title}</GoodsTitle>
      <GoodsContent>
        {discountRate > 0 && (
          <ContentItem>
            <span>정가</span>
            <Price>{getPriceText(price)}원</Price>
          </ContentItem>
        )}
        <ContentItem>
          <span>판매가격</span>
          <SalePrice>
            <span>{getPriceText(salePrice)}</span>원
          </SalePrice>
        </ContentItem>
        {deliveryFee > 0 && (
          <ContentItem>
            <span>배송정보</span>
            <DeliveryInfo>
              <p>{getPriceText(deliveryFee)}원</p>
              <p>{deliveryDetail}</p>
            </DeliveryInfo>
          </ContentItem>
        )}
      </GoodsContent>
    </>
  );
};

const GoodsTitle = styled.h2`
  font-size: 1.875rem;
  font-weight: 600;
  margin-bottom: 3rem;
  line-height: 1.5em;
`;
const GoodsContent = styled.div`
  font-size: 1rem;
`;
const ContentItem = styled.div`
  display: flex;
  column-gap: 2rem;
  align-items: flex-start;
  margin-bottom: 1rem;
  line-height: 1.5em;
  span {
    color: #717171;
    width: 5rem;
    font-weight: 600;
  }
`;
const Price = styled.p`
  text-decoration: line-through;
`;
const SalePrice = styled.p`
  font-weight: 600;
  span {
    font-family: 'Montserrat', sans-serif;
    font-size: 1.3125rem;
    color: #333;
  }
`;
const DeliveryInfo = styled.div``;

export default GoodsInfo;
