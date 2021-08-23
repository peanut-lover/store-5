import React, { useState } from 'react';
import { styled } from '@src/lib/CustomStyledComponent';
import TopSellingGoodsList from '@src/pages/Main/TopSellingGoodsList/TopSellingGoodsList';
import CategoryPieChart from '@src/pages/Main/CategoryPieChart/CategoryPieChart';

const Main = () => {
  return (
    <MainContainer>
      <LeftContainer>
        <LeftTopContainer>
          <CategoryPieChart />
          <TopSellingGoodsList />
        </LeftTopContainer>
        <div>왼쪽 하단</div>
      </LeftContainer>
      <RightContainer>오른쪽 한열</RightContainer>
    </MainContainer>
  );
};

const MainContainer = styled('div')`
  position: relative;
  display: flex;
  width: 100%;
  min-width: 1280px;
  padding: 32px;
`;

const LeftContainer = styled('div')`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 60%;
  height: 50%;
`;

const LeftTopContainer = styled('div')`
  display: flex;
  width: 100%;
  height: 100%;
`;

const RightContainer = styled('div')``;

export default Main;
