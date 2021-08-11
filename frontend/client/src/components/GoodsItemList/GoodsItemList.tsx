import React from 'react';
import GoodsItem from '@src/components/GoodsItem/GoodsItem';
import { Goods } from '@src/types/Goods';
import styled from 'styled-components';

interface Props {
  goodsList: Goods[];
}

const GoodsItemList: React.FC<Props> = ({ goodsList }) => {
  return (
    <GoodsItemListContainer>
      {goodsList && goodsList.map((goods) => <GoodsItem key={goods.id} {...goods} />)}
    </GoodsItemListContainer>
  );
};

const GoodsItemListContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

export default GoodsItemList;
