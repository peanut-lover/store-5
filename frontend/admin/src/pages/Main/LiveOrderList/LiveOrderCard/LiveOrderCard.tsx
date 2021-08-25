import { Order } from '@src/types/Order';
import { convertYYYYMMDDHHMMSS } from '@src/utils/dateHelper';
import React from 'react';
import styled from 'styled-components';

interface LiveOrderCardProps {
  onClickOrder: (order: Order) => void;
  order: Order;
}

const LiveOrderCard: React.FC<LiveOrderCardProps> = ({ order, onClickOrder }) => {
  const { id, orderItems, user, createdAt } = order;
  const firstOrderItems = orderItems[0];

  const handleClickCard = (e: React.MouseEvent) => {
    onClickOrder(order);
    e.stopPropagation();
  };

  return (
    <div onClick={handleClickCard}>
      <LiveOrderTitle>{convertYYYYMMDDHHMMSS(new Date(createdAt))}</LiveOrderTitle>
      <LiveOrderCardContainer key={id}>
        <img width={50} height={50} src={firstOrderItems.goods.thumbnailUrl} />
        <div>
          {firstOrderItems.goods.title}
          {orderItems.length > 1 && <span>외 {orderItems.length} 개</span>}
        </div>
        <LiveOrderCardUserImg src={user.profileImgUrl} />
        <div> {user.name} </div>
      </LiveOrderCardContainer>
    </div>
  );
};

const LiveOrderCardContainer = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px;
  margin-bottom: 5px;
  border-radius: 0px 14px 14px 14px;
  background-color: white;

  animation-name: orderCardShowEffect;
  animation-duration: 0.3s;

  @keyframes orderCardShowEffect {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const LiveOrderTitle = styled('p')`
  font-size: 12px;
  font-weight: 500;
  width: 140px;
  padding: 5px;
`;

const LiveOrderCardUserImg = styled('img')`
  border-radius: 50%;
  border: 1px solid #c0c0c0;
  width: 50px;
  height: 50px;
  object-fit: contain;
`;

export default LiveOrderCard;
