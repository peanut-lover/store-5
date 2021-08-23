import { getOrders } from '@src/apis/orderAPI';
import useInterval from '@src/hooks/useInterval';
import { styled } from '@src/lib/CustomStyledComponent';
import LiveOrderCard from '@src/pages/Main/LiveOrderList/LiveOrderCard/LiveOrderCard';
import { theme } from '@src/theme/theme';
import { Order } from '@src/types/Order';
import { convertYYYYMMDDHHMMSS } from '@src/utils/dateHelper';
import React, { useCallback, useEffect, useState } from 'react';

const LiveOrderList = () => {
  const [updating, setUpdating] = useState<boolean>(false);
  const [orders, setOrder] = useState<Order[]>([]);

  const poller = useCallback(async () => {
    setUpdating(!updating);
    const {
      result: { orderList },
    } = await getOrders({ page: 0, limit: 10 });
    setOrder(orderList);
  }, []);

  useInterval(poller, 1000);

  return (
    <LiveOrderListContainer>
      <LiveOrderListTitle color={theme.greenColor}>주문 현황</LiveOrderListTitle>
      <LiveOrderItemContainer>
        {orders.map((order) => (
          <LiveOrderCard key={order.id} order={order} />
        ))}
      </LiveOrderItemContainer>
    </LiveOrderListContainer>
  );
};

const LiveOrderListContainer = styled('div')`
  margin-left: 16px;
  padding: 16px;
  background-color: whitesmoke;
  border-radius: 16px;
  height: 100%;
`;

const LiveOrderListTitle = styled('span')<{ color: string }>`
  color: ${(props) => props.color};
  height: 1.5em;
  font-weight: 700;
  margin-bottom: 16px;
`;

const LiveOrderItemContainer = styled('div')`
  margin-top: 20px;
`;

const LiveOrderItem = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px;
`;

export default LiveOrderList;
