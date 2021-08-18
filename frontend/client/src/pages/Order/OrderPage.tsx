import styled from 'styled-components';
import React, { useMemo, useState } from 'react';

import { useRecoilValue } from 'recoil';
import { orderState } from '@src/recoil/orderState';

import PageHeader from '@src/components/PageHeader/PageHeader';
import Layout from '@src/pages/Cart/Layout/Layout';
import Divider from '@src/components/Divider/Divider';
import Button from '@src/components/PrimaryButton/PrimaryButton';
import CheckButtonWithLabel from '@src/components/CheckButtonWithLabel/CheckButtonWithLabel';
import HighlightedText from '@src/components/HighlightedText/HighlightedText';
import Topic from '@src/components/Topic/Topic';
import { AddressInfo } from '@src/types/Address';
import { getDiscountedPrice, getPriceText } from '@src/utils/price';
import OrderGoodsList from './OrderGoodsList/OrderGoodsList';
import AddressSection from './AddressSection/AddressSection';
import { usePushHistory } from '@src/lib/CustomRouter';

// TODO: NoData, Payment fetching, 체크박스 및 배송지 벨리데이션 후 Alert
const OrderPage: React.FC = () => {
  const orderGoodsList = useRecoilValue(orderState);
  const [selectedAddress, setSelectedAddress] = useState<AddressInfo | null>(null);
  const pushHistory = usePushHistory();

  const reducedPrice = useMemo(
    () =>
      orderGoodsList.reduce(
        (prev, cartGoods) =>
          prev + cartGoods.amount * getDiscountedPrice(cartGoods.goods.price, cartGoods.goods.discountRate),
        0
      ),
    [orderGoodsList]
  );
  // TODO: 배송비 정책 결정하고 대응 수정하기
  // 임시적으로 30000원 이상이면 배송비 0원, 아니면 2500원 부여
  const deliveryPrice = orderGoodsList.length !== 0 && reducedPrice < 30000 ? 2500 : 0;
  const totalPrice = reducedPrice + deliveryPrice;

  if (orderGoodsList.length === 0) {
    pushHistory('/');
    return null;
  }

  return (
    <Layout
      pageHeader={<PageHeader>주문/결제</PageHeader>}
      contentLeft={
        <FlexColumn gap='4rem'>
          <div>
            <Topic>배송정보</Topic>
            <AddressSection onChangeSelectedAddress={setSelectedAddress} />
          </div>
          <div>
            <Topic>주문 상품 ({orderGoodsList.length}건)</Topic>
            <OrderGoodsList orderGoodsList={orderGoodsList} />
          </div>
        </FlexColumn>
      }
      contentRight={
        <BorderBox>
          <PaddingBox>
            <FlexColumn gap='1.5rem'>
              <Topic>결제금액</Topic>
              <FlexRowSpaceBetween>
                <div>상품금액</div>
                <div>{getPriceText(reducedPrice)}원</div>
              </FlexRowSpaceBetween>
              <FlexRowSpaceBetween>
                <div>배송비</div>
                <div>+{getPriceText(deliveryPrice)}원</div>
              </FlexRowSpaceBetween>
              <Divider lineStyle='dashed' />
              <FlexRowSpaceBetween>
                <HighlightedText>총 결제금액</HighlightedText>
                <HighlightedText>{getPriceText(totalPrice)}원</HighlightedText>
              </FlexRowSpaceBetween>
            </FlexColumn>
          </PaddingBox>
          <Divider size={8} color='#eee' />
          <PaddingBox>
            <FlexColumn gap='1.5rem'>
              <Topic>결제수단 선택</Topic>
              <CheckButtonWithLabel isCircle isChecked={true} onClick={() => {}} label='신용・체크카드' />
              <CheckButtonWithLabel isCircle isChecked={true} onClick={() => {}} label='무통장입금(가상계좌)' />
              <CheckButtonWithLabel isCircle isChecked={true} onClick={() => {}} label='네이버페이' />
            </FlexColumn>
          </PaddingBox>
          <Divider size={8} color='#eee' />
          <PaddingBox>
            <FlexColumn gap='1rem'>
              <CheckButtonWithLabel isChecked={true} onClick={() => {}} label='결제 진행에 필요한 사항 동의' />
              <Button fullWidth>{getPriceText(totalPrice)}원 결제하기</Button>
            </FlexColumn>
          </PaddingBox>
        </BorderBox>
      }
    />
  );
};

const BorderBox = styled.div`
  box-sizing: border-box;
  border: 1px solid #ddd;
`;

const PaddingBox = styled.div`
  padding: 1.5rem;
`;

const FlexColumn = styled.div<{ gap?: string }>`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.gap ?? 'initial'};
`;

const FlexRowSpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default OrderPage;
