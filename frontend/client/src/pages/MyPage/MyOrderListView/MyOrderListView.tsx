import OrderAPI from '@src/apis/orderAPI';
import styled from 'styled-components';

import { Order, OrderPaginationResult } from '@src/types/Order';
import React, { useEffect, useState } from 'react';
import Topic from '@src/components/Topic/Topic';
import Paginator from '@src/components/Paginator/Paginator';

const DEFAULT_START_PAGE = 1;
const LIMIT_COUNT_ORDER = 10;

const MyOrderListView = () => {
  const [orderPaginationResult, setOrderPaginationResult] = useState<OrderPaginationResult | null>(null);
  const [currentPage, setCurrentPage] = useState(DEFAULT_START_PAGE);

  const fetchOrderList = async () => {
    const { result } = await OrderAPI.getOrders(1, LIMIT_COUNT_ORDER);
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
      <Topic>주문 조회 페이지</Topic>
      {orderPaginationResult && (
        <>
          {orderPaginationResult?.orderList.map((order) => {
            return <li key={order.id}>{order.title}</li>;
          })}
          <Paginator
            totalPage={orderPaginationResult?.meta.totalPage}
            currentPage={orderPaginationResult?.meta.page}
            setPage={setCurrentPage}
          />
        </>
      )}
    </MyOrderListViewContainer>
  );
};

const MyOrderListViewContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export default MyOrderListView;
