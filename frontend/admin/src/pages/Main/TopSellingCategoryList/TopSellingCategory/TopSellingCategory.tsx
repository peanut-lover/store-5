import { theme } from '@src/theme/theme';
import convertCountOfSell from '@src/utils/convertCountOfSell';
import React from 'react';
import styled from 'styled-components';

interface Props {
  category: { name: string; total: number };
  rank: number;
}

const TopSellingCategory: React.FC<Props> = ({ category, rank }) => {
  const BGCOLOR = [theme.GOLD, theme.SILVER, theme.BRONZE, 'transparent', 'transparent'];
  return (
    <TopSellingCategoryContainer>
      <TopSellingInfoContainer>
        <TopSellingRank bgcolor={BGCOLOR[rank - 1]}>{rank}.</TopSellingRank>
        <TopSellingCategoryTitle>{category.name}</TopSellingCategoryTitle>
      </TopSellingInfoContainer>
      <TopSellingCategoryCountContainer>
        <TopSellingCategoryCount bgcolor={theme.primary}>{convertCountOfSell(category.total)}</TopSellingCategoryCount>
      </TopSellingCategoryCountContainer>
    </TopSellingCategoryContainer>
  );
};

const TopSellingCategoryContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
`;

const TopSellingInfoContainer = styled.div`
  display: flex;
  font-size: 14px;
  column-gap: 1.5rem;
  align-items: center;
`;

const TopSellingRank = styled.div<{ bgcolor: string }>`
  /* background-color: ${(props) => props.bgcolor}; */
  color: black;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.6em;
  height: 1.6em;
  font-size: 11px;
  border-radius: 50%;
`;
const TopSellingCategoryTitle = styled.p`
  font-weight: 600;
  color: #555;
  font-size: 14px;
`;

const TopSellingCategoryCountContainer = styled.div`
  font-size: 12px;
`;
const TopSellingCategoryCount = styled.span<{ bgcolor: string }>`
  font-weight: 600;
  font-size: 16px;
  padding: 0.5rem;
  background-color: ${(props) => props.bgcolor};
  color: white;
  border-radius: 0.5rem;
`;

export default TopSellingCategory;
