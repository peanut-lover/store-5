import { styled } from '@src/lib/CustomStyledComponent';
import React from 'react';

const OrderTableHead = () => {
  return (
    <Head>
      <HeadCell>주문ID</HeadCell>
      <HeadCell>주문일시</HeadCell>
      <HeadCell>주문상품</HeadCell>
      <HeadCell>고객</HeadCell>
      <HeadCell>주문주소</HeadCell>
      <HeadCell>결제수단</HeadCell>
      <HeadCell>주문상태</HeadCell>
    </Head>
  );
};

const Head = styled('div')`
  display: grid;
  grid-template-columns: 0.5fr 1fr 2fr 1fr 1fr 1fr 1fr;
  height: 50px;
  font-size: 14px;
  font-weight: 600;
`;

const HeadCell = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default OrderTableHead;
