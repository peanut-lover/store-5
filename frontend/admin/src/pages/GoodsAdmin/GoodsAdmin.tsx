import React from 'react';
import { styled } from '@src/lib/CustomStyledComponent';
import GoodsTable from './GoodsTable/GoodsTable';

const GoodsAdmin = () => {
  return (
    <GoodsAdminContainer>
      <Title>상품 관리</Title>
      <GoodsTable />
    </GoodsAdminContainer>
  );
};

const Title = styled('h2')`
  font-size: 24px;
  font-weight: 600;
`;

const GoodsAdminContainer = styled('div')`
  width: 100%;
  padding: 5rem;
`;

export default GoodsAdmin;
