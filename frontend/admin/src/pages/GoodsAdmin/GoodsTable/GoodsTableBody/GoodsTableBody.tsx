import { styled } from '@src/lib/CustomStyledComponent';
import GoodsTableRow from '@src/pages/GoodsAdmin/GoodsTable/GoodsTableBody/GoodsTableRow/GoodsTableRow';
import { GoodsItem } from '@src/types/Goods';
import React from 'react';

interface Props {
  goodsList: GoodsItem[];
  handleModifyGoods: (goods: GoodsItem) => void;
}

const GoodsTableBody: React.FC<Props> = ({ goodsList, handleModifyGoods }) => {
  return (
    <GoodsTableBodyContainer>
      {goodsList.map((goods) => (
        <GoodsTableRow goods={goods} key={goods.id} handleModifyGoods={handleModifyGoods} />
      ))}
    </GoodsTableBodyContainer>
  );
};

const GoodsTableBodyContainer = styled('tbody')`
  font-size: 14px;
`;

export default GoodsTableBody;
