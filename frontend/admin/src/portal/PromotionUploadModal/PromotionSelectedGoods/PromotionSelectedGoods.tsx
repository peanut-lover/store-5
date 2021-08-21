import { styled } from '@src/lib/CustomStyledComponent';
import { theme } from '@src/theme/theme';
import { AutoSearchedItem } from '@src/types/Search';
import React from 'react';

interface Props {
  selectedGoods: AutoSearchedItem;
}
const PromotionSelectedGoods: React.FC<Props> = ({ selectedGoods }) => {
  return (
    <SelectedGoodsContainer>
      <PromotionTitle color={theme.greenColor}>프로모션 상품</PromotionTitle>
      <GoodsInfoContainer>
        <GoodsItemImage src={selectedGoods.thumbnailUrl} />
        <GoodsItemTitle>{selectedGoods.title}</GoodsItemTitle>
      </GoodsInfoContainer>
    </SelectedGoodsContainer>
  );
};

const SelectedGoodsContainer = styled('div')`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 70%;
  margin: auto;
  margin-top: 60px;
`;

const PromotionTitle = styled('p')<{ color: string }>`
  text-align: start;
  margin-bottom: 16px;
  font-size: 1.2em;
  color: ${(props) => props.color};
`;

const GoodsInfoContainer = styled('div')`
  display: flex;
  align-items: center;
  width: 100%;
  height: 70px;
`;
const GoodsItemImage = styled('img')`
  width: 25%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 20px;
`;

const GoodsItemTitle = styled('span')``;
export default PromotionSelectedGoods;
