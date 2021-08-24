import OrderTableBody from '@src/pages/OrderAdmin/OrderTable/OrderTableBody/OrderTableBody';
import OrderTableHead from '@src/pages/OrderAdmin/OrderTable/OrderTableBody/OrderTableHead';
import { Order } from '@src/types/Order';
import React from 'react';
import styled from 'styled-components';

interface OrderTableProps {
  orderList: Order[];
}

const OrderTable: React.FC<OrderTableProps> = ({ orderList }) => {
  return (
    <OrderTableContainer>
      <OrderTableHead />
      <OrderTableBody orderList={orderList} />
    </OrderTableContainer>
  );
};

const OrderTableContainer = styled.div`
  width: 100%;
  min-height: 650px;
`;

export default OrderTable;
