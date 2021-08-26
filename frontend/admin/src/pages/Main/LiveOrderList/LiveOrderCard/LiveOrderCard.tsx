import { theme } from '@src/theme/theme';
import { Order } from '@src/types/Order';
import { convertYYYYMMDDHHMMSS } from '@src/utils/dateHelper';
import React from 'react';
import styled from 'styled-components';

interface LiveOrderCardProps {
  onClickOrder: (order: Order) => void;
  order: Order;
}

const LiveOrderCard: React.FC<LiveOrderCardProps> = ({ order, onClickOrder }) => {
  const { orderItems, user, createdAt } = order;
  const firstOrderItems = orderItems[0];

  const handleClickCard = (e: React.MouseEvent) => {
    onClickOrder(order);
    e.stopPropagation();
  };

  return (
    <LiveOrderCardContainer onClick={handleClickCard}>
      <LiveOrderTitle>{convertYYYYMMDDHHMMSS(new Date(createdAt))}</LiveOrderTitle>
      <LiveOrderCardContent>
        <img width={50} height={50} src={firstOrderItems.goods.thumbnailUrl} />
        <div>
          {firstOrderItems.goods.title}
          {orderItems.length > 1 && <span>외 {orderItems.length} 개</span>}
        </div>
        <LiveOrderCardUserImg src={user.profileImgUrl} />
        <LiveOrderCardUserName> {user.name} </LiveOrderCardUserName>
      </LiveOrderCardContent>
    </LiveOrderCardContainer>
  );
};

const LiveOrderCardContainer = styled('div')`
  padding: 0.5rem;
  min-height: 80px;
  background-color: white;
  border-radius: 8px;
  border: 1px solid transparent;
  margin-bottom: 1rem;
  will-change: transform;
  will-change: opacity;
  animation-name: orderCardShowEffect;
  animation-duration: 1s;

  :hover {
    border: 1px solid ${theme.primary};
  }

  @keyframes orderCardShowEffect {
    from {
      opacity: 0;
      transform: translateX(50px);
    }

    to {
      opacity: 1;
      transform: translateX(0px);
    }
  }
`;

const LiveOrderCardContent = styled('div')`
  display: grid;
  align-items: center;
  justify-content: space-between;
  grid-template-columns: 1fr 2fr 1fr 1fr;

  border-radius: 0px 14px 14px 14px;
  background-color: transparent;
  font-size: 14px;
  padding: 0.5rem;
`;

const LiveOrderTitle = styled('p')`
  font-size: 12px;
  font-weight: 500;
  width: fit-content;
  padding: 5px 0;
`;

const LiveOrderCardUserImg = styled('img')`
  border-radius: 50%;
  border: 1px solid #c0c0c0;
  width: 30px;
  height: 30px;
  justify-self: center;
  object-fit: contain;
`;

const LiveOrderCardUserName = styled('p')``;

export default LiveOrderCard;
