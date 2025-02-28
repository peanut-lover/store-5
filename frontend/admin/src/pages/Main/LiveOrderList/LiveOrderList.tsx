import { getAllOrders } from '@src/apis/orderAPI';
import useInterval from '@src/hooks/useInterval';
import { styled } from '@src/lib/CustomStyledComponent';
import LiveOrderCard from '@src/pages/Main/LiveOrderList/LiveOrderCard/LiveOrderCard';
import OrderModal from '@src/portal/OrderModal/OrderModal';
import { theme } from '@src/theme/theme';
import { Order } from '@src/types/Order';
import { convertYYYYMMDDHHMMSS } from '@src/utils/dateHelper';
import React, { useCallback, useEffect, useState } from 'react';

const DEFAULT_LIVE_ORDER_LIMIT = 20;
const DEFAULT_START_PAGE = 0;
const POLLING_INTERVAL_MILLISECONDS = 2000;

const LiveOrderList = () => {
  const [updateTime, setUpdateTime] = useState<Date>(new Date());
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isOpenOrderModal, setIsOpenOrderModal] = useState<boolean>(false);
  const [orders, setOrder] = useState<Order[]>([]);

  const updateOrders = useCallback(async () => {
    setUpdateTime(new Date());
    try {
      const {
        result: { orderList },
      } = await getAllOrders({ page: DEFAULT_START_PAGE, limit: DEFAULT_LIVE_ORDER_LIMIT });
      setOrder(orderList);
    } catch (err) {
      console.error(err);
    }
  }, [setOrder, setUpdateTime]);

  useEffect(() => {
    updateOrders();
  }, []);

  useInterval(updateOrders, POLLING_INTERVAL_MILLISECONDS); // 1초마다 폴링

  const handleCloseModal = () => setIsOpenOrderModal(false);
  const handleClickOrder = (order: Order) => {
    setIsOpenOrderModal(true);
    setSelectedOrder(order);
  };

  return (
    <LiveOrderListContainer>
      <LiveOrderListTitle color={theme.black5}>최신 주문 현황</LiveOrderListTitle>
      <LatestUpdateTime color={theme.black5}>
        (최근 업데이트 시간: {convertYYYYMMDDHHMMSS(updateTime)})
      </LatestUpdateTime>
      <LiveOrderItemContainer>
        {orders.map((order) => (
          <LiveOrderCard key={order.id} order={order} onClickOrder={handleClickOrder} />
        ))}
      </LiveOrderItemContainer>
      {isOpenOrderModal && selectedOrder && <OrderModal onClose={handleCloseModal} order={selectedOrder} />}
    </LiveOrderListContainer>
  );
};

const LiveOrderListContainer = styled('div')`
  padding: 16px;
  background-color: transparent;
  border-radius: 6px;
  height: 100%;
`;

const LiveOrderListTitle = styled('span')<{ color: string }>`
  color: ${(props) => props.color};
  height: 1.5em;
  font-weight: 600;
  margin-bottom: 16px;
`;

const LatestUpdateTime = styled('span')<{ color: string }>`
  padding-left: 5px;
  color: ${(props) => props.color};
  font-size: 10px;
`;

const LiveOrderItemContainer = styled('div')`
  margin-top: 20px;
  height: 100%;
  overflow-y: scroll;
  overflow-x: visible;
`;

export default LiveOrderList;
