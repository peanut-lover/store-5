import React from 'react';
import PageHeader from '@src/components/PageHeader/PageHeader';
import Layout from '@src/pages/Cart/Layout/Layout';
import styled from 'styled-components';
import Divider from '@src/components/Divider/Divider';
import Button from '@src/components/Button/Button';
import CheckButtonWithLabel from '@src/components/CheckButtonWithLabel/CheckButtonWithLabel';
import HighlightedText from '@src/components/HighlightedText/HighlightedText';

const OrderPage: React.FC = () => {
  return (
    <Layout
      pageHeader={<PageHeader>주문/결제</PageHeader>}
      contentLeft={
        <Wrapper>
          <FlexColumn gap='4rem'>
            <div>
              <Topic>배송정보</Topic>
            </div>
            <div>
              <Topic>주문 상품 (1건)</Topic>
            </div>
          </FlexColumn>
        </Wrapper>
      }
      contentRight={
        <BorderBox>
          <PaddingBox>
            <FlexColumn gap='1.5rem'>
              <Topic>결제금액</Topic>
              <FlexRowSpaceBetween>
                <div>상품금액</div>
                <div>42,800원</div>
              </FlexRowSpaceBetween>
              <FlexRowSpaceBetween>
                <div>배송비</div>
                <div>+0원</div>
              </FlexRowSpaceBetween>
              <Divider lineStyle={'dashed'} />
              <FlexRowSpaceBetween>
                <HighlightedText>총 결제금액</HighlightedText>
                <HighlightedText>42,800원</HighlightedText>
              </FlexRowSpaceBetween>
            </FlexColumn>
          </PaddingBox>
          <Divider size={8} color={'#eee'} />
          <PaddingBox>
            <FlexColumn gap='1.5rem'>
              <Topic>결제수단 선택</Topic>
              <CheckButtonWithLabel isCircle isChecked={true} onClick={() => {}} label={'신용・체크카드'} />
              <CheckButtonWithLabel isCircle isChecked={true} onClick={() => {}} label={'무통장입금(가상계좌)'} />
              <CheckButtonWithLabel isCircle isChecked={true} onClick={() => {}} label={'네이버페이'} />
            </FlexColumn>
          </PaddingBox>
          <Divider size={8} color={'#eee'} />
          <PaddingBox>
            <FlexColumn gap='1rem'>
              <CheckButtonWithLabel isChecked={true} onClick={() => {}} label={'결제 진행에 필요한 사항 동의'} />
              <Button fullWidth>42,800원 결제하기</Button>
            </FlexColumn>
          </PaddingBox>
        </BorderBox>
      }
    />
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

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

const StrongText = styled.h2`
  padding: 0;
  margin: 0;
  font-size: 1.375rem;
  font-weight: bolder;
`;

const Topic: React.FC = ({ children }) => {
  return (
    <div>
      <StrongText>{children}</StrongText>
      <Divider size={2} />
    </div>
  );
};

export default OrderPage;
