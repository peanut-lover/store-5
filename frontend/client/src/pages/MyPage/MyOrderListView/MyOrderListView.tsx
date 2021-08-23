import OrderAPI from '@src/apis/orderAPI';
import styled from 'styled-components';

import { OrderPaginationResult } from '@src/types/Order';
import React, { useEffect, useState } from 'react';
import Topic from '@src/components/Topic/Topic';
import Paginator from '@src/components/Paginator/Paginator';
import OrderCard from '@src/pages/MyPage/MyOrderListView/OrderCard';

const DEFAULT_START_PAGE = 1; // 초기 페이지네이션 페이지.
const LIMIT_COUNT_ORDER = 4; // 화면 사이즈를 생각했을 때 4 개가 적당합니다.

const MyOrderListView = () => {
  const [orderPaginationResult, setOrderPaginationResult] = useState<OrderPaginationResult | null>(null);
  const [currentPage, setCurrentPage] = useState(DEFAULT_START_PAGE);
  const [focusOrderId, setFocusOrderId] = useState<number>(0);

  const handleClickOrder = (orderId: number) => {
    setFocusOrderId(orderId);
  };

  const fetchOrderList = async () => {
    const { result } = await OrderAPI.getOrders({ page: currentPage, limit: LIMIT_COUNT_ORDER });
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
      <Topic>반가워요! 고객님의 주문 내역입니다.</Topic>
      <OrderCountLabel>주문 조회 내역 총 {orderPaginationResult?.meta.totalCount} 건</OrderCountLabel>
      {orderPaginationResult && (
        <OrderPaginationContainer>
          <OrderCardList>
            {orderPaginationResult?.orderList.map((order) => {
              const showDetail = order.id === focusOrderId;
              return <OrderCard key={order.id} order={order} detail={showDetail} onClick={handleClickOrder} />;
            })}
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

const OrderCountLabel = styled.p`
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const MyOrderListViewContainer = styled.div`
  width: 900px;
  display: flex;
  flex-direction: column;
  animation: fadeInEffect 0.5s 0s;
  @keyframes fadeInEffect {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const OrderPaginationContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const OrderCardList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  min-height: 500px;
`;

export default MyOrderListView;
