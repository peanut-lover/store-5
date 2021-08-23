import React, { useState } from 'react';
import { styled } from '@src/lib/CustomStyledComponent';
import TopSellingGoodsList from '@src/pages/Main/TopSellingGoodsList/TopSellingGoodsList';
import CategoryPieChart from '@src/pages/Main/CategoryPieChart/CategoryPieChart';

const Main = () => {
  return (
    <MainContainer>
      <CategoryPieChart />
      <TopSellingGoodsList />
    </MainContainer>
  );
};

const MainContainer = styled('div')`
  position: relative;
  width: 100%;
`;

export default Main;
