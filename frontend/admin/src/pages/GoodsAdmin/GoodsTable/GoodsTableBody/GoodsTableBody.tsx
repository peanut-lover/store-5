import { styled } from '@src/lib/CustomStyledComponent';
import GoodsTableRow from '@src/pages/GoodsAdmin/GoodsTable/GoodsTableBody/GoodsTableRow/GoodsTableRow';
import { GoodsItem } from '@src/types/Goods';
import React from 'react';

interface Props {
  goodsList: GoodsItem[];
}

const GoodsTableBody: React.FC<Props> = ({ goodsList }) => {
  return (
    <GoodsTableBodyContainer>
      {goodsList.map((goods, id) => (
        <GoodsTableRow goods={goods} key={id} />
      ))}
    </GoodsTableBodyContainer>
  );
};

const GoodsTableBodyContainer = styled('tbody')``;

export default GoodsTableBody;
