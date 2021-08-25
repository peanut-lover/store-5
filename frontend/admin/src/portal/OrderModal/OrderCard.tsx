import React from 'react';
import { styled } from '@src/lib/CustomStyledComponent';
import OrderItemCard from '@src/portal/OrderModal/OrderGoods';
import { Order } from '@src/types/Order';
import { convertYYYYMMDDHHMMSS } from '@src/utils/dateHelper';
import { FaHome } from '@react-icons/all-files/fa/FaHome';
import { FaBoxes } from '@react-icons/all-files/fa/FaBoxes';
import { FaTruck } from '@react-icons/all-files/fa/FaTruck';
import { FaMoneyCheck } from '@react-icons/all-files/fa/FaMoneyCheck';

interface OrderCard {
  order: Order;
}
const OrderCard: React.FC<OrderCard> = ({ order }) => {
  return (
    <OrderCardContainer>
      <OrderCardContainerHeader>
        <OrderTimeSection>
          <TitleLabel>주문 일시</TitleLabel>
          <div>주문 시간: {convertYYYYMMDDHHMMSS(new Date(order.createdAt))}</div>
          <div>최종 수정 시간: {convertYYYYMMDDHHMMSS(new Date(order.updatedAt))}</div>
        </OrderTimeSection>
        <OrderUserSection>
          <TitleLabel>고객 정보</TitleLabel>
          <UserProfileImg src={order.user.profileImgUrl} />
          <UserProfileName>{order.user.name}</UserProfileName>
        </OrderUserSection>
      </OrderCardContainerHeader>

      <OrderCardContainerBody>
        <OrderGoodsSection>
          <TitleLabel>
            <FaBoxes />
            주문 상품들
          </TitleLabel>
          <OrderItemCardList>
            {order.orderItems.map((orderItem) => (
              <OrderItemCard orderItem={orderItem} />
            ))}
          </OrderItemCardList>
        </OrderGoodsSection>
        <OrderInfoSection>
          <DeliverySection>
            <TitleLabel>
              <FaHome /> 배송지
            </TitleLabel>
            <DeliveryInfo>
              <DeliveryInfoLabel>받는 사람</DeliveryInfoLabel>
              <p>{order.receiver}</p>
              <DeliveryInfoLabel>주소</DeliveryInfoLabel>
              <p>{order.address}</p>
              <DeliveryInfoLabel>상세 주소</DeliveryInfoLabel>
              <p>{order.subAddress}</p>
              <DeliveryInfoLabel>ZIP Code</DeliveryInfoLabel>
              <p>{order.zipCode}</p>
            </DeliveryInfo>
          </DeliverySection>
          <OrderStateSection>
            <TitleLabel>
              <FaTruck /> 주문 상태
            </TitleLabel>
            <OrderState>{order.state}</OrderState>
          </OrderStateSection>
          <PaymentSection>
            <TitleLabel>
              <FaMoneyCheck /> 결제 수단
            </TitleLabel>
            <PaymentInfo>
              <PaymentInfoLabel>결제 방식</PaymentInfoLabel>
              <p>{order.payment.type}</p>
            </PaymentInfo>
          </PaymentSection>
        </OrderInfoSection>
      </OrderCardContainerBody>
    </OrderCardContainer>
  );
};

const OrderCardContainer = styled('div')`
  width: 100%;
  height: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const OrderCardContainerHeader = styled('div')`
  display: flex;
  width: 100%;
  height: 20%;
`;

const OrderTimeSection = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 50%;
`;

const OrderUserSection = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  row-gap: 0.5rem;
`;

const OrderCardContainerBody = styled('div')`
  display: flex;
  width: 100%;
  justify-content: space-between;
  height: 80%;
`;

const OrderGoodsSection = styled('div')`
  width: 70%;
  height: 100%;
`;

const OrderItemCardList = styled('ul')`
  display: flex;
  padding: 1rem;
  flex-direction: column;
  justify-content: flex-start;
  height: 90%;
  border: 1px solid #c0c0c0;
  border-radius: 16px;
  overflow: scroll;
`;

const OrderInfoSection = styled('div')`
  width: 25%;
  height: 100%;
`;

const DeliverySection = styled('div')`
  min-height: 40%;
`;

const DeliveryInfo = styled('div')`
  display: grid;
  grid-template-columns: 1fr;
  border: 1px solid #c0c0c0;
  border-radius: 16px;
  padding: 1rem;
`;

const DeliveryInfoLabel = styled('label')`
  font-size: 1rem;
  font-weight: 600;
  padding: 0.5rem;
`;

const OrderStateSection = styled('div')`
  height: 20%;
`;

const OrderState = styled('div')`
  border: 1px solid #c0c0c0;
  border-radius: 16px;
  padding: 1rem;
`;

const PaymentSection = styled('div')`
  height: 20%;
`;

const PaymentInfo = styled('div')`
  border: 1px solid #c0c0c0;
  border-radius: 16px;
  padding: 1rem;
`;

const PaymentInfoLabel = styled('label')`
  font-size: 1rem;
  font-weight: 600;
  padding: 0.5rem;
`;

const TitleLabel = styled('div')`
  font-size: 1.5rem;
  padding: 1rem;
`;

const UserProfileImg = styled('img')`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: contain;
`;

const UserProfileName = styled('p')`
  font-size: 1rem;
  font-weight: 600;
`;

export default OrderCard;
