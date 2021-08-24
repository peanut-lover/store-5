import { theme } from '@src/theme/theme';
import convertCountOfSell from '@src/utils/convertCountOfSell';
import React from 'react';
import styled from 'styled-components';

interface Props {
  category: { name: string; total: number };
  rank: number;
}

const TopSellingCategory: React.FC<Props> = ({ category, rank }) => {
  const BGCOLOR = [theme.GOLD, theme.SILVER, theme.BRONZE, theme.LIGHTGRAY, theme.LIGHTGRAY];
  return (
    <TopSellingCategoryContainer>
      <TopSellingInfoContainer>
        <TopSellingRank bgcolor={BGCOLOR[rank - 1]}>{rank}</TopSellingRank>
        <TopSellingCategoryTitle>{category.name}</TopSellingCategoryTitle>
      </TopSellingInfoContainer>
      <TopSellingCategoryCountContainer color={theme.greenColor}>
        <TopSellingCategoryCount>{convertCountOfSell(category.total)}</TopSellingCategoryCount>
      </TopSellingCategoryCountContainer>
    </TopSellingCategoryContainer>
  );
};

const TopSellingCategoryContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TopSellingInfoContainer = styled.div`
  display: flex;
  font-size: 1.1em;
`;

const TopSellingRank = styled.div<{ bgcolor: string }>`
  margin-right: 24px;
  background-color: ${(props) => props.bgcolor};
  color: #fff;
  width: 2em;
  border-radius: 50%;
  text-align: center;
  line-height: 2em;
`;
const TopSellingCategoryTitle = styled.p`
  display: flex;
  align-items: center;
`;

const TopSellingCategoryCountContainer = styled.div<{ color: string }>`
  padding: 0.5em;
  background-color: ${(props) => props.color};
  border-radius: 12px;
`;
const TopSellingCategoryCount = styled.span`
  color: #fff;
`;

export default TopSellingCategory;
