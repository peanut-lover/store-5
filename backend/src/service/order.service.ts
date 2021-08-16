import { CreateOrderBody } from './../types/request/order.request';
import { OrderList } from '../entity/OrderList';
import { OrderListRepository } from '../repository/order.list.repository';

async function getOrders(userId: number): Promise<OrderList[]> {
  return await OrderListRepository.getOrders(userId);
}

async function createOrder(userId: number, body: CreateOrderBody) {
  return await OrderListRepository.createOrder(userId, body);
}

export const OrderService = {
  getOrders,
  createOrder,
};
