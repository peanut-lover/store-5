import React, { useState } from 'react';
import PageHeader from '@src/components/PageHeader/PageHeader';
import Layout from '@src/pages/Cart/Layout/Layout';

const OrderPage: React.FC = () => {
  return <Layout pageHeader={<PageHeader>주문/결제</PageHeader>} contentLeft={<>안녕</>} contentRight={<>하하</>} />;
};

export default OrderPage;
