import { getAllOrders } from '@src/apis/orderAPI';
import Loading from '@src/components/Loading/Loading';
import Paginator from '@src/components/Paginator/Paginator';
import OrderTable from '@src/pages/OrderAdmin/OrderTable/OrderTable';
import OrderModal from '@src/portal/OrderModal/OrderModal';
import { theme } from '@src/theme/theme';
import { Order, OrderPaginationResult } from '@src/types/Order';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const DEFAULT_START_PAGE = 0;
const DEFAULT_LIMIT_ORDER = 10;

const OrderAdmin = () => {
  const [isOpenOrderModal, setIsOpenOrderModal] = useState(false);

  const [orderPaginationResult, setOrderPaginationResult] = useState<OrderPaginationResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(DEFAULT_START_PAGE);

  const fetchOrders = async () => {
    try {
      const { result } = await getAllOrders({
        page: currentPage,
        limit: DEFAULT_LIMIT_ORDER,
      });
      setOrderPaginationResult(result);
      setErrorMessage('');
    } catch (err) {
      setErrorMessage('주문 정보를 불러오는데 실패했습니다.');
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [currentPage]);

  const handleCloseModal = () => {
    setIsOpenOrderModal(false);
  };

  const handleClickOrder = (order: Order) => {
    setIsOpenOrderModal(true);
  };

  return (
    <OrderAdminContainer>
      <TitleSection>
        <Title>주문 관리</Title>
        <p>총 주문 {orderPaginationResult?.meta.totalCount} 건</p>
        <span>{errorMessage}</span>
      </TitleSection>

      {orderPaginationResult ? (
        <OrderTable orderList={orderPaginationResult.orderList} onClickOrder={handleClickOrder} />
      ) : (
        <Loading />
      )}

      {orderPaginationResult && (
        <Paginator
          totalPage={orderPaginationResult.meta.totalPage}
          currentPage={orderPaginationResult.meta.page}
          setPage={setCurrentPage}
        />
      )}

      {isOpenOrderModal && <OrderModal onClose={handleCloseModal} />}
    </OrderAdminContainer>
  );
};

const OrderAdminContainer = styled('div')`
  position: relative;
  width: 100%;
  padding: 5rem;
  background-color: ${theme.dustWhite};
`;

const Title = styled('h2')`
  font-size: 24px;
  font-weight: 600;
  margin-right: 1rem;
`;

const TitleSection = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-start;
  margin-bottom: 20px;
`;

export default OrderAdmin;
