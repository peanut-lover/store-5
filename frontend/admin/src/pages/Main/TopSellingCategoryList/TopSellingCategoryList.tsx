import CategoryAPI from '@src/apis/categoryAPI';
import { styled } from '@src/lib/CustomStyledComponent';
import TopSellingCategory from '@src/pages/Main/TopSellingCategoryList/TopSellingCategory/TopSellingCategory';
import { theme } from '@src/theme/theme';
import { BestSelledCategory } from '@src/types/Category';
import React, { useEffect, useState } from 'react';

const TopSellingCategoryList = () => {
  const [categories, setCategories] = useState<BestSelledCategory[]>([]);
  useEffect(() => {
    async function fetchingCategories() {
      const { result } = await CategoryAPI.getBestSellingCategory();
      setCategories(result);
    }
    fetchingCategories();
  }, []);

  return (
    <TopSellingContainer>
      <TopSellingTitleContainer>
        <TopSellingTitle color={theme.black5}>카테고리 순위</TopSellingTitle>
        <TopSellingTitle color={theme.black5}>
          <SaleIcon color={theme.label}>판매량</SaleIcon>
        </TopSellingTitle>
      </TopSellingTitleContainer>
      <CategoriesContainer>
        {categories.map((category, i) => (
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
  width: 20%;
  height: 100%;
  padding: 16px;
  background-color: #fff;
  border-radius: 6px;
`;

const TopSellingTitleContainer = styled('div')`
  display: flex;
  justify-content: space-between;
`;

const TopSellingTitle = styled('span')<{ color: string }>`
  color: ${(props) => props.color};
  height: 1.5em;
  font-weight: 600;
  margin-bottom: 16px;
`;

const CategoriesContainer = styled('div')`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const SaleIcon = styled('span')<{ color: string }>`
  font-weight: 500;
  font-size: 0.8rem;
  padding: 0.2rem;
  border-radius: 0.1rem;
  color: ${(props) => props.color};
`;

export default TopSellingCategoryList;
