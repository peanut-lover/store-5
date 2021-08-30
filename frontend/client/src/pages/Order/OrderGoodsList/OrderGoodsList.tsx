import React from 'react';
import { GoodsBeforeOrder } from '@src/types/Goods';
import OrderGoodsListItem from './OrderGoodsListItem/OrderGoodsListItem';

interface Props {
  orderGoodsList: GoodsBeforeOrder[];
}

const OrderGoodsList: React.FC<Props> = ({ orderGoodsList }) => {
  return (
    <>
      {orderGoodsList.map((orderGoods) => (
        <OrderGoodsListItem key={orderGoods.goods.id} orderGoods={orderGoods} />
      ))}
    </>
  );
};

export default OrderGoodsList;
