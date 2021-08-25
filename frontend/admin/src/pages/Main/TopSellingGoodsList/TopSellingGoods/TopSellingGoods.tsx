import originStyled from 'styled-components';
import { styled } from '@src/lib/CustomStyledComponent';
import { theme } from '@src/theme/theme';
import convertCountOfSell from '@src/utils/convertCountOfSell';
import React from 'react';

interface Props {
  item: {
    thumbnailUrl: string;
    title: string;
    countOfSell: number;
  };
  rank: number;
}

const TopSellingGoods: React.FC<Props> = ({ item, rank }) => {
  const BGCOLOR = [theme.GOLD, theme.SILVER, theme.BRONZE, 'transparent', 'transparent'];
  return (
    <TopSellingGoodsContainer>
      <TopSellingGoodsImage src={item.thumbnailUrl} />
      <TopSellingGoodsTitle>{item.title}</TopSellingGoodsTitle>
      <SellingGoodsCountContainer>
        <TopSellingGoodsCount bgcolor={theme.primary}> {convertCountOfSell(item.countOfSell)}</TopSellingGoodsCount>
      </SellingGoodsCountContainer>
    </TopSellingGoodsContainer>
  );
};

const TopSellingGoodsContainer = styled('div')`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;
const TopSellingGoodsImage = styled('img')`
  width: 50px;
  height: 50px;
  max-height: 100%;
  object-fit: cover;
  border-radius: 2px;
`;

const TopSellingGoodsTitle = styled('p')`
  width: 70%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  text-align: start;
  color: #555;
  padding-left: 0.5rem;
  font-weight: 600;
  font-size: 0.8rem;
`;

const SellingGoodsCountContainer = styled('div')`
  font-size: 12px;
`;

const TopSellingGoodsCount = styled('span')<{ bgcolor: string }>`
  font-weight: 600;
  font-size: 16px;
  padding: 0.5rem;
  background-color: ${(props) => props.bgcolor};
  color: white;
  border-radius: 0.5rem;
`;

export default TopSellingGoods;
