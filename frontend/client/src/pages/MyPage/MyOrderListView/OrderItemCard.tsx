import React from 'react';
import styled from 'styled-components';

import { OrderItem } from '@src/types/Order';
import { usePushHistory } from '@src/lib/CustomRouter';
import GoodsAmount from '@src/pages/GoodsDetail/GoodsInteractive/GoodsAmount/GoodsAmount';

interface OrderItemCardProps {
  orderItem: OrderItem;
}

const OrderItemCard: React.FC<OrderItemCardProps> = ({ orderItem }) => {
  const {
    amount,
    goods: { id: goodsId, title, thumbnailUrl },
  } = orderItem;

  const push = usePushHistory();
  const handleMoveDetailGoodsPage = () => {
    push('/detail/' + goodsId);
  };

  return (
    <OrderItemCardContainer onClick={handleMoveDetailGoodsPage}>
      <OrderItemCardThumbnail src={thumbnailUrl} />
      <OrderItemCardInfo>
        {truncateString(title, 20)}
        {amount > 1 && ` x ${amount}`}
      </OrderItemCardInfo>
    </OrderItemCardContainer>
  );
};

const truncateString = (text: string, length: number) => (text.length > length ? text.slice(0, length) + '...' : text);

interface OrderItemCardContainerProps {
  theme: {
    primary: string;
  };
}
const OrderItemCardContainer = styled.div<OrderItemCardContainerProps>`
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  cursor: pointer;
  border: 1px solid transparent;
  &:hover {
    border: 1px solid ${(props) => props.theme.primary};
  }
`;

const OrderItemCardThumbnail = styled.img`
  width: 50px;
  height: 50px;

  object-fit: contain;
`;

const OrderItemCardInfo = styled.p`
  margin-top: 5px;
`;

export default OrderItemCard;
