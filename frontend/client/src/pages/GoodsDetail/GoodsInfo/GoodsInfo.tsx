import React from 'react';
import styled from 'styled-components';

const calculateSalePrice = (price: number, discountRate: number) => price - price * (discountRate / 100);

export interface GoodsInfoProps {
  title: string;
  price: number;
  discountRate: number;
  deliveryFee: number;
  deliveryDetail: string;
  isWished: boolean;
}

const GoodsInfo: React.FC<GoodsInfoProps> = ({ title, price, discountRate, deliveryFee, deliveryDetail, isWished }) => {
  const salePrice = calculateSalePrice(price, discountRate);

  return (
    <>
      <GoodsTitle>{title}</GoodsTitle>
      <GoodsContent>
        {discountRate > 0 && (
          <ContentItem>
            <span>정가</span>
            <Price>{price.toLocaleString()}원</Price>
          </ContentItem>
        )}
        <ContentItem>
          <span>판매가격</span>
          <SalePrice>
            <span>{salePrice.toLocaleString()}</span>원
          </SalePrice>
        </ContentItem>
        <ContentItem>
          <span>배송정보</span>
          <DeliveryInfo>
            <p>{deliveryFee.toLocaleString()}원</p>
            <p>{deliveryDetail}</p>
          </DeliveryInfo>
        </ContentItem>
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
