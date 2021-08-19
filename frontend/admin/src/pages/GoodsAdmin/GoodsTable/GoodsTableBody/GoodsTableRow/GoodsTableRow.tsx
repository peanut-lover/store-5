import React from 'react';
import { styled } from '@src/lib/CustomStyledComponent';
import { GoodsItem } from '@src/types/Goods';
import { getDiscountedPrice } from '@src/utils/price';

interface Props {
  goods: GoodsItem;
}

const GoodsTableRow: React.FC<Props> = ({ goods }) => {
  const { id, thumbnailUrl, title, price, discountRate, stock, countOfSell, createdAt, updatedAt, state, category } =
    goods;
  const salePrice = getDiscountedPrice(price, discountRate);
  return (
    <GoodsTableRowContainer>
      <TableData>
        <ThumbnailImg src={thumbnailUrl} />
      </TableData>
      <TableData>{title}</TableData>
      <TableData>{price}</TableData>
      <TableData>{discountRate}</TableData>
      <TableData>{stock}</TableData>
      <TableData>{countOfSell}</TableData>
      <TableData>{createdAt}</TableData>
      <TableData>{updatedAt}</TableData>
      <TableData>{state}</TableData>
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
