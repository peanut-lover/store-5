import { useParams } from '@src/lib/CustomRouter';
import styled from 'styled-components';
import React from 'react';
import CategoryNavigator from '@src/pages/CategoryGoods/CategoryNavigator/CategoryNavigator';
import CategoryGoodsList from '@src/pages/CategoryGoods/CategoryGoodsList/CategoryGoodsList';

const appendQuotationMarks = (text: string) => `"${text}"`;

const CategoryGoods = () => {
  const { category } = useParams();
  return (
    <CategoryGoodsContainer>
      <CategoryClassificationLabel>{`상위카테고리 > ${category}`}</CategoryClassificationLabel>
      <CategoryTitle>{appendQuotationMarks(category)}</CategoryTitle>
      <CategoryContentContainer>
        <CategoryContentNav>
          <CategoryNavigator />
        </CategoryContentNav>
        <CategoryContentMain>
          <CategoryGoodsList category={category} />
        </CategoryContentMain>
      </CategoryContentContainer>
    </CategoryGoodsContainer>
  );
};

const CategoryGoodsContainer = styled.div`
  width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const CategoryClassificationLabel = styled.p`
  margin-top: 2rem;
  font-size: 16px;
`;

const CategoryTitle = styled.h1`
  align-self: center;
  font-size: 3rem;
  margin: 2rem 0px;
`;

const CategoryContentContainer = styled.main`
  display: flex;
`;

const CategoryContentNav = styled.nav`
  width: 300px;
`;

const CategoryContentMain = styled.main`
  flex-grow: 1;
`;

export default CategoryGoods;
