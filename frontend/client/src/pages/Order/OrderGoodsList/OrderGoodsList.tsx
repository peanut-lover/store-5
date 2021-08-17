import { OrderGoods } from '@src/types/Goods';
import React from 'react';
import OrderGoodsListItem from './OrderGoodsListItem/OrderGoodsListItem';

interface Props {
  orderGoodsList: OrderGoods[];
}

const OrderGoodsList: React.FC<Props> = ({ orderGoodsList }) => {
  return (
    <>
      {orderGoodsList.map((orderGoods) => (
        <OrderGoodsListItem key={orderGoods.id} orderGoods={orderGoods} />
      ))}
    </>
  );
};

export default OrderGoodsList;
