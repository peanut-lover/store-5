import { getRepository } from 'typeorm';
import { OrderItem } from '../entity/OrderItem';
import { CreateOrderItem } from '../types/Order';

async function createOrderItem(goodsId: number, orderId: number, orderItemBody: CreateOrderItem): Promise<OrderItem> {
  return await getRepository(OrderItem).save({
    amount: orderItemBody.amount,
    price: orderItemBody.price,
    discountRate: orderItemBody.discountRate,
    state: orderItemBody.state,
    goods: { id: goodsId },
    order: { id: orderId },
  });
}

export const OrderItemRepository = {
  createOrderItem,
};
