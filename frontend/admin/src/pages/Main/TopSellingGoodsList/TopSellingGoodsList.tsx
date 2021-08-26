import { GoodsAPI } from '@src/apis/goodsAPI';
import { styled } from '@src/lib/CustomStyledComponent';
import TopSellingGoods from '@src/pages/Main/TopSellingGoodsList/TopSellingGoods/TopSellingGoods';
import { theme } from '@src/theme/theme';
import { GoodsItem } from '@src/types/Goods';
import React, { useEffect, useState } from 'react';

const TopSellingGoodsList = () => {
  const [goodsList, setGoodsList] = useState<GoodsItem[]>([]);

  useEffect(() => {
    async function fetchingGoodsList() {
      const { result } = await GoodsAPI.getBestSellingGoodsForDashboard();
      setGoodsList(result);
    }
    fetchingGoodsList();
  }, []);

  return (
    <TopSellingContainer>
      <TopSellingTitleContainer>
        <TopSellingTitle bgcolor={theme.black5}>상품 판매 순위</TopSellingTitle>
        <TopSellingTitle bgcolor={theme.black5}>
          <SaleIcon color={theme.label}>판매량</SaleIcon>
        </TopSellingTitle>
      </TopSellingTitleContainer>
      <GoodsListContainer>
        {goodsList.map((item, i) => (
          <TopSellingGoods key={i} item={item} rank={i + 1} />
        ))}
      </GoodsListContainer>
    </TopSellingContainer>
  );
};

const TopSellingContainer = styled('div')`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 30%;
  height: 100%;
  padding: 16px;
  background-color: #fff;
  border-radius: 6px;
`;
const TopSellingTitleContainer = styled('div')`
  display: flex;
  justify-content: space-between;
`;
const GoodsListContainer = styled('div')`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
`;

const TopSellingTitle = styled('span')<{ bgcolor: string }>`
  color: ${(props) => props.bgcolor};
  height: 1.5em;
  font-weight: 600;
  margin-bottom: 16px;
`;

const SaleIcon = styled('span')<{ color: string }>`
  font-weight: 500;
  font-size: 0.8rem;
  padding: 0.2rem;
  border-radius: 0.1rem;
  color: ${(props) => props.color};
`;

export default TopSellingGoodsList;
