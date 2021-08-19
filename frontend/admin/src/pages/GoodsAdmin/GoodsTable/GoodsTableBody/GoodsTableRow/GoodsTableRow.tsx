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

const GoodsTableRowContainer = styled('tr')``;
const TableData = styled('td')``;
const ThumbnailImg = styled('img')``;

// const GoodsItemRow =

export default GoodsTableRow;
