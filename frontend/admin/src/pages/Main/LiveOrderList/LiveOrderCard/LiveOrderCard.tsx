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
        <LiveOrderCardUser>
          <LiveOrderCardUserImg src={user.profileImgUrl} />
          <LiveOrderCardUserName> {user.name} </LiveOrderCardUserName>
        </LiveOrderCardUser>
      </LiveOrderCardContent>
    </LiveOrderCardContainer>
  );
};

const LiveOrderCardContainer = styled('div')`
  padding: 0.5rem;
  background-color: white;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const LiveOrderCardContent = styled('div')`
  display: grid;
  align-items: center;
  justify-content: space-between;
  grid-template-columns: 1fr 3fr 1fr;
  column-gap: 1rem;
  padding: 0;
  border-radius: 0px 14px 14px 14px;
  background-color: transparent;
  font-size: 14px;
  padding: 1rem;

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
  width: fit-content;
  padding: 5px 0;
`;
const LiveOrderCardUser = styled('div')`
  display: flex;
`;

const LiveOrderCardUserImg = styled('img')`
  border-radius: 50%;
  border: 1px solid #c0c0c0;
  width: 30px;
  height: 30px;
  margin-right: 1rem;
  object-fit: contain;
`;

const LiveOrderCardUserName = styled('p')``;

export default LiveOrderCard;
