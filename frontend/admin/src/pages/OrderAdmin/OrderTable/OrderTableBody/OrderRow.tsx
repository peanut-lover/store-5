import React from 'react';
import { styled } from '@src/lib/CustomStyledComponent';
import originStyled from 'styled-components';
import { Order } from '@src/types/Order';
import { convertYYYYMMDDHHMMSS } from '@src/utils/dateHelper';

interface OrderRowProps {
  onClickOrder: (order: Order) => void;
  order: Order;
}

const OrderRow: React.FC<OrderRowProps> = ({ order, onClickOrder }) => {
  const handleClickRow = (e: React.MouseEvent) => {
    onClickOrder(order);
  };

  return (
    <OrderRowContainer onClick={handleClickRow}>
      <OrderRowCell>
        <p>{order.id}</p>
      </OrderRowCell>
      <OrderRowCell>{convertYYYYMMDDHHMMSS(new Date(order.createdAt))}</OrderRowCell>
      <OrderItemRowCell>
        {order.orderItems.map((orderItem, idx) => {
          return <OrderItemImg key={idx} src={orderItem.goods.thumbnailUrl} />;
        })}
      </OrderItemRowCell>
      <OrderUserRowCell>
        <UserThumbnailImg src={order.user.profileImgUrl} />
        <p>{order.user.name}</p>
      </OrderUserRowCell>
      <OrderRowCell>
        {order.address}/ {order.subAddress}
      </OrderRowCell>
      <OrderRowCell>{order.payment.type}</OrderRowCell>
      <OrderRowCell>{order.state}</OrderRowCell>
    </OrderRowContainer>
  );
};

const OrderRowContainer = originStyled.li`
  display: grid;
  grid-template-columns: 0.5fr 1fr 2fr 1fr 1fr 1fr 1fr;
  height: 60px;
  cursor: pointer;
  transition: background-color 0.15s linear;
  :hover {
    background-color: rgba(0, 0, 0, 0.15);
  }
`;

const OrderRowCell = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const OrderItemRowCell = styled('ul')`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  overflow-x: scroll;
`;

const OrderItemImg = styled('img')`
  width: 50px;
  height: 50px;
  border: 1px solid #c0c0c0;
  margin-right: 2px;
`;

const OrderUserRowCell = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const UserThumbnailImg = styled('img')`
  border-radius: 50%;
  width: 50px;
  height: 50px;
  object-fit: contain;
  margin-right: 2px;
`;

export default OrderRow;
