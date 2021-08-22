import { styled } from '@src/lib/CustomStyledComponent';
import { AutoSearchedItem } from '@src/types/Search';
import React from 'react';

interface Props {
  searchGoods: AutoSearchedItem;
  onUpdateSelectedGoods: (goods: AutoSearchedItem) => void;
}

const GoodsSearchItem: React.FC<Props> = ({ searchGoods, onUpdateSelectedGoods }) => {
  const handleClick = () => {
    onUpdateSelectedGoods({
      ...searchGoods,
    });
  };
  return (
    <GoodsItemContainer onClick={handleClick}>
      <GoodsItemImage src={searchGoods.thumbnailUrl} />
      <GoodsItemTitle>{searchGoods.title}</GoodsItemTitle>
    </GoodsItemContainer>
  );
};

const GoodsItemContainer = styled('div')`
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 28px;
  height: 35px;
  cursor: pointer;
`;

const GoodsItemImage = styled('img')`
  width: 15%;
  height: 100%;
  margin-right: 15px;
  border-radius: 8px;
`;

const GoodsItemTitle = styled('span')``;

export default GoodsSearchItem;
