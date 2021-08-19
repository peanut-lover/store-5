import OrderAPI from '@src/apis/orderAPI';
import styled from 'styled-components';

import { OrderPaginationResult } from '@src/types/Order';
import React, { useEffect, useState } from 'react';
import Topic from '@src/components/Topic/Topic';
import Paginator from '@src/components/Paginator/Paginator';
import { convertYYYYMMDD } from '@src/utils/dateHelper';
import OrderCard from '@src/pages/MyPage/MyOrderListView/OrderCard';

const DEFAULT_START_PAGE = 1;
const LIMIT_COUNT_ORDER = 4;

const MyOrderListView = () => {
  const [orderPaginationResult, setOrderPaginationResult] = useState<OrderPaginationResult | null>(null);
  const [currentPage, setCurrentPage] = useState(DEFAULT_START_PAGE);

  const fetchOrderList = async () => {
    const { result } = await OrderAPI.getOrders(currentPage, LIMIT_COUNT_ORDER);
    setOrderPaginationResult(result);
  };

  useEffect(() => {
    try {
      fetchOrderList();
    } catch (err) {
      console.error(err);
      alert('주문정보 불러오는데 실패했습니다. 서버오류');
    }
  }, [currentPage]);
  return (
    <MyOrderListViewContainer>
      <Topic>반가워요! 주문 내역입니다.</Topic>
      <p>주문 조회 내역 총 {orderPaginationResult?.meta.totalCount} 건</p>
      {orderPaginationResult && (
        <OrderPaginationContainer>
          <OrderCardList>
            {orderPaginationResult?.orderList.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </OrderCardList>

          <Paginator
            totalPage={orderPaginationResult?.meta.totalPage}
            currentPage={orderPaginationResult?.meta.page}
            setPage={setCurrentPage}
          />
        </OrderPaginationContainer>
      )}
    </MyOrderListViewContainer>
  );
};

const MyOrderListViewContainer = styled.div`
  width: 900px;
  display: flex;
  flex-direction: column;
`;

const OrderPaginationContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const OrderCardList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`;

export default MyOrderListView;
