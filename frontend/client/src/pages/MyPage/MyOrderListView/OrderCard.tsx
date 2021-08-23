import HighlightedText from '@src/components/HighlightedText/HighlightedText';
import { Order } from '@src/types/Order';
import { convertYYYYMMDD } from '@src/utils/dateHelper';
import React, { useState } from 'react';
import styled from 'styled-components';
import OrderItemCard from './OrderItemCard';

interface Props {
  order: Order;
  onClick: (orderId: number) => void;
  detail?: boolean;
}

const OrderCard: React.FC<Props> = ({ order, onClick, detail = false }) => {
  const { orderItems } = order;
  return (
    <OrderCardContainer>
      <MainContent onClick={() => onClick(order.id)}>
        <OrderCardDateAndIdCell>
          <OrderIdText>{order.id}</OrderIdText>
          {convertYYYYMMDD(new Date(order.createdAt))}
        </OrderCardDateAndIdCell>
        <OrderCardProductInfo>
          {orderItems.length > 0 ? (
            <>
              <ThumbnailImg src={orderItems[0].goods.thumbnailUrl} />
              <OrderCardProductInfoTitle>
                <span>{orderItems[0].goods.title}</span>
                {orderItems.length > 1 && <span> 외 {orderItems.length - 1} 개의 상품</span>}
              </OrderCardProductInfoTitle>
            </>
          ) : (
            <h1>대표 상품이 없습니다.</h1> // 데이터 무결성 문제.
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
      </MainContent>

      {detail && (
        <DetailContent>
          {orderItems.map((orderItem) => (
            <OrderItemCard key={orderItem.id} orderItem={orderItem} />
          ))}
        </DetailContent>
      )}
    </OrderCardContainer>
  );
};

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr 1fr;
  grid-template-rows: 1fr;
  height: 120px;
  width: 100%;
  padding: 10px;
  cursor: pointer;
`;

const DetailContent = styled.div`
  display: flex;
  padding-left: 10px;
  padding-top: 15px;
  padding-bottom: 15px;
  overflow: scroll;
`;

interface OrderCardContainer {
  theme: {
    line: string;
  };
}
const OrderCardContainer = styled.li<OrderCardContainer>`
  width: 100%;
  border: 1px solid ${(props) => props.theme.line};
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
