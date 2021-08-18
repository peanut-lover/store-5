import { getRepository } from 'typeorm';
import { OrderItem } from '../entity/OrderItem';
import { CreateOrderItem } from '../types/Order';

async function createOrderItem(goodsId: number, orderListId: number, orderItemBody: CreateOrderItem) {
  return await getRepository(OrderItem).save({ ...orderItemBody, goods: goodsId, orderList: orderListId });
}

export const OrderItemRepository = {
  createOrderItem,
};
