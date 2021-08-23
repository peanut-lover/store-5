import { styled } from '@src/lib/CustomStyledComponent';
import TopSellingCategory from '@src/pages/Main/TopSellingCategoryList/TopSellingCategory/TopSellingCategory';
import { theme } from '@src/theme/theme';
import React from 'react';

const TopSellingCategoryList = () => {
  const mock = [
    { name: '잡화', total: 5000 },
    { name: '문구', total: 3000 },
    { name: '생필품', total: 4000 },
    { name: '에디션', total: 2000 },
    { name: '굿즈', total: 1000 },
  ];

  return (
    <TopSellingContainer>
      <TopSellingTitleContainer>
        <TopSellingTitle color={theme.greenColor}>Top Selling Categories</TopSellingTitle>
        <TopSellingTitle color={theme.greenColor}>판매량</TopSellingTitle>
      </TopSellingTitleContainer>
      <CategoriesContainer>
        {mock.map((category, i) => (
          <TopSellingCategory key={category.name} rank={i + 1} category={category} />
        ))}
      </CategoriesContainer>
    </TopSellingContainer>
  );
};

const TopSellingContainer = styled('div')`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 100%;
  padding: 16px;
  background-color: whitesmoke;
  border-radius: 16px;
`;

const TopSellingTitleContainer = styled('div')`
  display: flex;
  justify-content: space-between;
`;

const TopSellingTitle = styled('span')<{ color: string }>`
  color: ${(props) => props.color};
  height: 1.5em;
  font-weight: 700;
  margin-bottom: 16px;
`;

const CategoriesContainer = styled('div')`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
`;
export default TopSellingCategoryList;
