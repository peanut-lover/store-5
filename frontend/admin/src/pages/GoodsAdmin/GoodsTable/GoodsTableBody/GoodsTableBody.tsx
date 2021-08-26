import { styled } from '@src/lib/CustomStyledComponent';
import GoodsTableRow from '@src/pages/GoodsAdmin/GoodsTable/GoodsTableBody/GoodsTableRow/GoodsTableRow';
import { GoodsItem } from '@src/types/Goods';
import React from 'react';

interface Props {
  goodsList: GoodsItem[];
  handleUpdateGoods: (goods: GoodsItem) => void;
}

// TODO: 상품목록이 없는 경우 비어있음을 알리는 컴포넌트 추가 (ex: 텅)
const GoodsTableBody: React.FC<Props> = ({ goodsList, handleUpdateGoods }) => {
  return (
    <GoodsTableBodyContainer>
      {goodsList.map((goods) => (
        <GoodsTableRow goods={goods} key={goods.id} handleUpdateGoods={handleUpdateGoods} />
      ))}
    </GoodsTableBodyContainer>
  );
};

const GoodsTableBodyContainer = styled('tbody')`
  font-size: 14px;
`;

export default GoodsTableBody;
