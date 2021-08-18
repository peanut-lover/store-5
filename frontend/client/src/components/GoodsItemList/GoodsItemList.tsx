import React from 'react';
import GoodsItem, { GoodsItemSize } from '@src/components/GoodsItem/GoodsItem';
import { Goods } from '@src/types/Goods';
import styled from 'styled-components';

interface Props {
  goodsList: Goods[];
  itemBoxSize?: GoodsItemSize;
}

const GoodsItemList: React.FC<Props> = ({ goodsList, itemBoxSize = 'big' }) => {
  return (
    <GoodsItemListContainer>
      {goodsList &&
        goodsList.map((goods) => (
          <GoodsItem
            key={goods.id}
            id={goods.id}
            thumbnailUrl={goods.thumbnailUrl}
            title={goods.title}
            price={goods.price}
            isBest={goods.isBest}
            isGreen={goods.isGreen}
            isNew={goods.isNew}
            isSale={goods.isSale}
            discountRate={goods.discountRate}
            itemBoxSize={itemBoxSize}
          />
        ))}
    </GoodsItemListContainer>
  );
};

const GoodsItemListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

export default GoodsItemList;
