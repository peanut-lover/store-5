import { styled } from '@src/lib/CustomStyledComponent';
import OrderRow from '@src/pages/OrderAdmin/OrderTable/OrderTableBody/OrderRow';
import { Order } from '@src/types/Order';
import React from 'react';

interface OrderTableBodyProps {
  onClickOrder: (order: Order) => void;
  orderList: Order[];
}

const OrderTableBody: React.FC<OrderTableBodyProps> = ({ orderList, onClickOrder }) => {
  return (
    <OrderTableBodyContainer>
      {orderList.map((order) => (
        <OrderRow key={order.id} order={order} onClickOrder={onClickOrder} />
      ))}
    </OrderTableBodyContainer>
  );
};

const OrderTableBodyContainer = styled('ul')`
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
`;

export default OrderTableBody;
