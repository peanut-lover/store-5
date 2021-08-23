import React from 'react';
import styled from 'styled-components';
import { getDiscountedPrice, getPriceText } from '@src/utils/price';
import { DetailGoods } from '@src/types/Goods';
import InfoContent from '@src/pages/GoodsDetail/GoodsInfo/InfoContent/InfoContent';
import theme from '@src/theme/theme';

export interface GoodsInfoProps {
  goods: DetailGoods;
}

// TODO: deliveryFee, deliveryDetail는 상품 등록 이후 기본값 삭제?
const GoodsInfo: React.FC<GoodsInfoProps> = ({
  goods: { title, price, discountRate, deliveryFee = 0, deliveryDetail = '', countOfSell, stock },
}) => {
  const salePrice = getDiscountedPrice(price, discountRate);

  return (
    <>
      <GoodsTitle>{title}</GoodsTitle>
      <GoodsContent>
        {discountRate > 0 && (
          <InfoContent labelText={'정가'}>
            <Price>{getPriceText(price)}원</Price>
          </InfoContent>
        )}
        <InfoContent labelText={'판매가격'}>
          <SalePrice>{getPriceText(salePrice)}원</SalePrice>
        </InfoContent>
        {deliveryFee > 0 && (
          <InfoContent labelText={'배송정보'}>
            <DeliveryInfo>
              <p>{getPriceText(deliveryFee)}원</p>
              <p>{deliveryDetail}</p>
            </DeliveryInfo>
          </InfoContent>
        )}
        <InfoContent labelText={'판매량'}>{countOfSell}개</InfoContent>
        <InfoContent labelText={'남은 수량'}>{stock}개</InfoContent>
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
const Price = styled.p`
  text-decoration: line-through;
`;
const SalePrice = styled.p`
  font-weight: 600;
  font-family: 'Montserrat', sans-serif;
  font-size: 1.3125rem;
  color: ${theme.primary};
`;
const DeliveryInfo = styled.div``;

export default GoodsInfo;
