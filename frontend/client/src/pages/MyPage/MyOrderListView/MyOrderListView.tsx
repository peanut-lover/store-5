import OrderAPI from '@src/apis/orderAPI';
import styled from 'styled-components';

import { OrderPaginationResult } from '@src/types/Order';
import React, { useEffect, useState } from 'react';
import Topic from '@src/components/Topic/Topic';
import Paginator from '@src/components/Paginator/Paginator';
import OrderCard from '@src/pages/MyPage/MyOrderListView/OrderCard';
import { usePushToast } from '@src/lib/ToastProvider/ToastProvider';
import emptyKimImgUrl from '@src/assets/empty-kim.gif';

const DEFAULT_START_PAGE = 1; // 초기 페이지네이션 페이지.
const LIMIT_COUNT_ORDER = 4; // 화면 사이즈를 생각했을 때 4 개가 적당합니다.

const MyOrderListView = () => {
  const [orderPaginationResult, setOrderPaginationResult] = useState<OrderPaginationResult | null>(null);
  const [currentPage, setCurrentPage] = useState(DEFAULT_START_PAGE);
  const [focusOrderId, setFocusOrderId] = useState<number>(0);
  const pushToast = usePushToast();

  const handleClickOrder = (orderId: number) => {
    setFocusOrderId(orderId);
  };

  const fetchOrderList = async () => {
    try {
      const { result } = await OrderAPI.getOrders({ page: currentPage, limit: LIMIT_COUNT_ORDER });
      setOrderPaginationResult(result);
    } catch (err) {
      console.error(err);
      pushToast({
        text: '주문정보 불러오는데 실패했습니다. 서버오류',
      });
    }
  };

  useEffect(() => {
    fetchOrderList();
  }, [currentPage]);

  if (!orderPaginationResult) return null;

  return (
    <MyOrderListViewContainer>
      <Topic>반가워요! 고객님의 주문 내역입니다.</Topic>
      {orderPaginationResult.orderList.length > 0 ? (
        <>
          <OrderCountLabel>주문 조회 내역 총 {orderPaginationResult.meta.totalCount} 건</OrderCountLabel>
          <OrderPaginationContainer>
            <OrderCardList>
              {orderPaginationResult.orderList.map((order) => {
                const showDetail = order.id === focusOrderId;
                return <OrderCard key={order.id} order={order} detail={showDetail} onClick={handleClickOrder} />;
              })}
            </OrderCardList>

            <Paginator
              totalPage={orderPaginationResult.meta.totalPage}
              currentPage={orderPaginationResult.meta.page}
              setPage={setCurrentPage}
            />
          </OrderPaginationContainer>
        </>
      ) : (
        <EmptyContainer>
          <EmptyImg src={emptyKimImgUrl} />
          <EmptyTitle>주문 상품이 없습니다.</EmptyTitle>
        </EmptyContainer>
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

const EmptyImg = styled.img`
  height: 8rem;
`;

const EmptyTitle = styled.h2`
  margin: 0;
  padding: 0;
  color: #666;
  font-size: 1.25rem;
  font-weight: normal;
`;

const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  margin-top: 4rem;
  margin-bottom: 4rem;
  margin-right: 8rem;
`;

export default MyOrderListView;
