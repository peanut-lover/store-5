import OrderTableBody from '@src/pages/OrderAdmin/OrderTable/OrderTableBody/OrderTableBody';
import OrderTableHead from '@src/pages/OrderAdmin/OrderTable/OrderTableBody/OrderTableHead';
import { Order } from '@src/types/Order';
import React from 'react';
import styled from 'styled-components';

interface OrderTableProps {
  onClickOrder: (order: Order) => void;
  orderList: Order[];
}

const OrderTable: React.FC<OrderTableProps> = ({ orderList, onClickOrder }) => {
  return (
    <OrderTableContainer>
      <OrderTableHead />
      <OrderTableBody orderList={orderList} onClickOrder={onClickOrder} />
    </OrderTableContainer>
  );
};

const OrderTableContainer = styled.div`
  width: 100%;
`;

export default OrderTable;
