import { styled } from '@src/lib/CustomStyledComponent';
import { OrderItem } from '@src/types/Order';
import { getPriceText } from '@src/utils/price';
import React from 'react';

interface OrderItemCardProps {
  orderItem: OrderItem;
}
const OrderItemCard: React.FC<OrderItemCardProps> = ({ orderItem }) => {
  const { goods, amount, price, state } = orderItem;

  return (
    <OrderGoodsContainer>
      <div>{goods.id}</div>
      <GoodsThumbnail src={goods.thumbnailUrl} />
      <div>{goods.title}</div>
      <div>수량: {amount} 개 </div>
      <div>금액: {getPriceText(price)} 원</div>
      <div>상태: {state}</div>
    </OrderGoodsContainer>
  );
};

const OrderGoodsContainer = styled('div')`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  align-items: center;
  margin-bottom: 5px;
  padding-bottom: 5px;
  border-bottom: 1px solid #c0c0c0;
`;

const GoodsThumbnail = styled('img')`
  width: 50px;
  height: 50px;
`;

export default OrderItemCard;
