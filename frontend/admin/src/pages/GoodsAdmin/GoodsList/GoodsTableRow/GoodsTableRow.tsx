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
  return <div></div>;
};

// const GoodsItemRow =

export default GoodsTableRow;
