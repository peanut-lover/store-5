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
  return (
    <TopSellingGoodsContainer>
      <TopSellingGoodsImage src={item.thumbnailUrl} />
      <TopSellingGoodsTitle>{item.title}</TopSellingGoodsTitle>
      <SellingGoodsCountContainer bgcolor={theme.greenColor}>
        <TopSellingGoodsCount> {convertCountOfSell(item.countOfSell)}</TopSellingGoodsCount>
      </SellingGoodsCountContainer>
      <TopSellingRank bgcolor={theme.greenColor}>{rank + 1}</TopSellingRank>
    </TopSellingGoodsContainer>
  );
};

const TopSellingGoodsContainer = styled('div')`
  position: relative;
  display: flex;
  align-items: center;
  height: 16%;
  width: 100%;
  margin-bottom: 16px;
`;
const TopSellingGoodsImage = styled('img')`
  width: 25%;
  height: 100%;
  margin-right: 16px;
  object-fit: cover;
`;

const TopSellingGoodsTitle = styled('p')`
  width: 60%;
  margin-right: 16px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  text-align: start;
`;

const SellingGoodsCountContainer = styled('div')<{ bgcolor: string }>`
  padding: 0.5em;
  background-color: ${(props) => props.bgcolor};
  border-radius: 12px;
`;

const TopSellingGoodsCount = styled('span')`
  color: #fff;
`;

const TopSellingRank = styled('div')<{ bgcolor: string }>`
  position: absolute;
  top: -5px;
  left: -5px;
  text-align: center;
  background-color: ${(props) => props.bgcolor};
  color: #fff;
  width: 1.1em;
  border-radius: 50%;
`;

export default TopSellingGoods;
