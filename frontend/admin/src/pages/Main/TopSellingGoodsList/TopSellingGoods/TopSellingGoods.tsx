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
}

const TopSellingGoods: React.FC<Props> = ({ item }) => {
  return (
    <TopSellingGoodsContainer>
      <TopSellingGoodsImage src={item.thumbnailUrl} />
      <TopSellingGoodsTitle>{item.title}</TopSellingGoodsTitle>
      <SellingGoodsCountContainer bgcolor={theme.greenColor}>
        <TopSellingGoodsCount> {convertCountOfSell(item.countOfSell)}</TopSellingGoodsCount>
      </SellingGoodsCountContainer>
    </TopSellingGoodsContainer>
  );
};

const TopSellingGoodsContainer = styled('div')`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 16px;
`;
const TopSellingGoodsImage = styled('img')`
  width: 25%;
  margin-right: 16px;
`;

const TopSellingGoodsTitle = styled('p')`
  width: 60%;
  margin-right: 16px;
`;

const SellingGoodsCountContainer = styled('div')<{ bgcolor: string }>`
  padding: 0.5em;
  background-color: ${(props) => props.bgcolor};
  border-radius: 16px;
`;
const TopSellingGoodsCount = styled('span')`
  color: #fff;
`;

export default TopSellingGoods;
