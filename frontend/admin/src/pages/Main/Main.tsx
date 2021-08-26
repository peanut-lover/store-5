import React from 'react';
import { styled } from '@src/lib/CustomStyledComponent';
import TopSellingGoodsList from '@src/pages/Main/TopSellingGoodsList/TopSellingGoodsList';
import CategoryPieChart from '@src/pages/Main/CategoryPieChart/CategoryPieChart';
import LiveOrderList from '@src/pages/Main/LiveOrderList/LiveOrderList';
import TopSellingCategoryList from '@src/pages/Main/TopSellingCategoryList/TopSellingCategoryList';
import CategoryBarChart from '@src/pages/Main/CategoryBarChart/CategoryBarChart';

const Main = () => {
  return (
    <MainContainer>
      <LeftContainer>
        <LeftTopContainer>
          <CategoryPieChart />
          <TopSellingGoodsList />
          <TopSellingCategoryList />
        </LeftTopContainer>
        <LeftBottomContainer>
          <CategoryBarChart />
        </LeftBottomContainer>
      </LeftContainer>
      <RightContainer>
        <LiveOrderList />
      </RightContainer>
    </MainContainer>
  );
};

const MainContainer = styled('div')`
  position: relative;
  display: flex;
  width: 100%;
  min-width: 1280px;
  padding: 2rem;
  background-color: #eee;
`;

const LeftContainer = styled('div')`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 70%;
  height: 100%;
  justify-content: space-around;
  row-gap: 1rem;
`;

const LeftTopContainer = styled('div')`
  display: flex;
  width: 100%;
  height: calc(50% - 1rem);
  column-gap: 1rem;
`;

const LeftBottomContainer = styled('div')`
  display: flex;
  width: 100%;
  height: calc(50% - 1rem);
  column-gap: 1rem;
`;

const RightContainer = styled('div')`
  width: 30%;
  height: 100%;
  padding-left: 1rem;
`;

export default Main;
