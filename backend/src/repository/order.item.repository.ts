import { Goods } from './../entity/Goods';
import { getRepository } from 'typeorm';
import { OrderItem } from '../entity/OrderItem';
import { CreateOrderItem } from '../types/Order';

async function createOrderItem(
  goodsId: number,
  orderListId: number,
  orderItemBody: CreateOrderItem
): Promise<OrderItem> {
  return await getRepository(OrderItem).save({
    ...orderItemBody,
    goods: { id: goodsId },
    orderList: { id: orderListId },
  });
}

async function getAllOrderItemByListId(orderListId: number): Promise<OrderItem[]> {
  return await getRepository(OrderItem).find({ where: { orderList: orderListId } });
}

async function findOrderGoodsInfoById(orderItemId: number): Promise<OrderItem | undefined> {
  return await getRepository(OrderItem).findOne({
    relations: ['goods'],
    where: {
      id: orderItemId,
    },
  });
}

export const OrderItemRepository = {
  createOrderItem,
  getAllOrderItemByListId,
  findOrderGoodsInfoById,
};
