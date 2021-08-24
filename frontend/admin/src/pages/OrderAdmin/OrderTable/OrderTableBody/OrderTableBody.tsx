import { styled } from '@src/lib/CustomStyledComponent';
import OrderRow from '@src/pages/OrderAdmin/OrderTable/OrderTableBody/OrderRow';
import { Order } from '@src/types/Order';
import React from 'react';

interface OrderTableBodyProps {
  orderList: Order[];
}

const OrderTableBody: React.FC<OrderTableBodyProps> = ({ orderList }) => {
  return (
    <OrderTableBodyContainer>
      {orderList.map((order) => (
        <OrderRow key={order.id} order={order} />
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
