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
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const GoodsThumbnail = styled('img')`
  width: 50px;
  height: 50px;
`;

export default OrderItemCard;
