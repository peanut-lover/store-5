import React from 'react';
import { styled } from '@src/lib/CustomStyledComponent';
import { GoodsItem } from '@src/types/Goods';
import { getDiscountedPrice, getPriceText } from '@src/utils/price';

interface Props {
  goods: GoodsItem;
}

interface StateMap {
  [keyword: string]: string;
}

const STATE_MAP: StateMap = {
  S: '판매중',
  T: '임시저장',
  D: '삭제',
};

function getDateToStringFormat(date: Date) {
  return `${date.getFullYear()}-${('0' + date.getMonth()).slice(-2)}-${('0' + date.getDate()).slice(-2)}`;
}

const GoodsTableRow: React.FC<Props> = ({ goods }) => {
  const { id, thumbnailUrl, title, price, discountRate, stock, countOfSell, createdAt, updatedAt, state, category } =
    goods;
  return (
    <GoodsTableRowContainer>
      <TableData>
        <ThumbnailImg src={thumbnailUrl} />
      </TableData>
      <TableData>{title}</TableData>
      <TableData>{getPriceText(price)}원</TableData>
      <TableData>{discountRate}</TableData>
      <TableData>{stock}</TableData>
      <TableData>{countOfSell}</TableData>
      <TableData>{getDateToStringFormat(new Date(createdAt))}</TableData>
      <TableData>{getDateToStringFormat(new Date(updatedAt))}</TableData>
      <TableData>{STATE_MAP[state]}</TableData>
      <TableData>{category.name}</TableData>
    </GoodsTableRowContainer>
  );
};

const GoodsTableRowContainer = styled('tr')`
  margin-bottom: 0.5rem;
  height: 55px;
`;
const TableData = styled('td')`
  vertical-align: middle;
`;
const ThumbnailImg = styled('img')`
  width: 40px;
  height: 40px;
`;

// const GoodsItemRow =

export default GoodsTableRow;
