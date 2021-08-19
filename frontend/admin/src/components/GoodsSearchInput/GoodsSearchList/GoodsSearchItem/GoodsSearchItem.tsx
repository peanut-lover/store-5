import { styled } from '@src/lib/CustomStyledComponent';
import { AutoSearch } from '@src/types/Search';
import React from 'react';

interface Props {
  searchGoods: AutoSearch;
  onUpdateSelectedGoods: (goods: AutoSearch) => void;
}

const GoodsSearchItem: React.FC<Props> = ({ searchGoods, onUpdateSelectedGoods }) => {
  const handleClick = () => {
    onUpdateSelectedGoods({
      id: searchGoods.id,
      thumbnailUrl: searchGoods.thumbnailUrl,
      title: searchGoods.title,
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
