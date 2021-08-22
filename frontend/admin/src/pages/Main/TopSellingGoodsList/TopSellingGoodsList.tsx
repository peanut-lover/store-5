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
      <TopSellingTitle bgcolor={theme.greenColor}>Top Selling Goods</TopSellingTitle>
      <GoodsListContainer>
        {goodsList.map((item, i) => (
          <TopSellingGoods key={i} item={item} />
        ))}
      </GoodsListContainer>
    </TopSellingContainer>
  );
};

const TopSellingContainer = styled('div')`
  display: flex;
  flex-direction: column;
  width: 30%;
  height: 50%;
  padding: 16px;
  overflow: auto;
`;

const GoodsListContainer = styled('div')`
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

const TopSellingTitle = styled('span')<{ bgcolor: string }>`
  color: ${(props) => props.bgcolor};
  height: 1.5em;
  font-weight: 700;
  margin-bottom: 30px;
`;

export default TopSellingGoodsList;
