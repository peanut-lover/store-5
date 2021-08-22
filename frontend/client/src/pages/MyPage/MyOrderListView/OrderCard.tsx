import HighlightedText from '@src/components/HighlightedText/HighlightedText';
import { Order } from '@src/types/Order';
import { convertYYYYMMDD } from '@src/utils/dateHelper';
import React from 'react';
import styled from 'styled-components';

interface Props {
  order: Order;
}

const OrderCard: React.FC<Props> = ({ order }) => {
  const { orderItems } = order;

  return (
    <OrderCardContainer>
      <OrderCardDateAndIdCell>
        <OrderIdText>{order.id}</OrderIdText>
        {convertYYYYMMDD(new Date(order.createdAt))}
      </OrderCardDateAndIdCell>
      <OrderCardProductInfo>
        {orderItems.length > 0 ? (
          <>
            <ThumbnailImg src={orderItems[0].goods.thumbnailUrl} />
            <OrderCardProductInfoTitle>{orderItems[0].goods.title}</OrderCardProductInfoTitle>
          </>
        ) : (
          <h1>대표 상품이 없습니다.</h1>
        )}
      </OrderCardProductInfo>
      <OrderCardStateInfo>
        <OrderStateText>
          <HighlightedText fontSize={'10px'}>{order.state}</HighlightedText>
        </OrderStateText>
      </OrderCardStateInfo>
      <OrderCardDeliveryInfo>
        <div>{order.address}</div>
        <div>{order.subAddress}</div>
      </OrderCardDeliveryInfo>
      <OrderControlContainer>
        <button>자세히 보기</button>
      </OrderControlContainer>
    </OrderCardContainer>
  );
};

const OrderCardContainer = styled.li`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  border-bottom: 1px solid black;
  height: 120px;
  width: 100%;
  padding: 10px;
`;

const OrderCardDateAndIdCell = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const OrderIdText = styled.p`
  cursor: pointer;
  opacity: 0.8;
  padding: 1rem;
  &:hover {
    opacity: 1;
    outline-color: black;
    outline-width: 1px;
  }
`;

const OrderCardProductInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const OrderCardProductInfoTitle = styled.div`
  margin-left: 1rem;
`;

const ThumbnailImg = styled.img`
  width: 100px;
  height: 100px;
  object-fit: contain;
`;

const OrderCardStateInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const OrderStateText = styled.div``;

const OrderCardDeliveryInfo = styled.div`
  display: flex;
  align-items: center;
`;

const OrderControlContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

export default OrderCard;
