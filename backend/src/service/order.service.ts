import { CreateOrderBody } from './../types/request/order.request';
import { OrderList } from '../entity/OrderList';
import { OrderListRepository } from '../repository/order.list.repository';
import { OrderItemRepository } from '../repository/order.item.repository';
import { GoodsRepository } from '../repository/goods.repository';
import { BadRequestError } from '../errors/client.error';
import { INVALID_DATA } from '../constants/client-error-name';
import { OrderGoods } from '../types/Order';

async function getOrders(userId: number): Promise<OrderList[]> {
  return await OrderListRepository.getOrders(userId);
}

async function createOrder(userId: number, body: CreateOrderBody): Promise<OrderList> {
  const goodsList = [...body.goodsList];
  const newBody = JSON.parse(JSON.stringify({ ...body }));
  delete newBody.goodsList;
  const orderList = await OrderListRepository.createOrder(userId, newBody);
  await Promise.all(goodsList.map(async (orderedItem) => await createOrderItem(orderedItem, orderList.id)));
  return orderList;
}

async function createOrderItem(orderedItem: OrderGoods, orderListId: number) {
  const goods = await GoodsRepository.findGoodsDetailById(orderedItem.id);
  if (!goods) throw new BadRequestError(INVALID_DATA);
  const { price, discountRate, state } = goods;
  await OrderItemRepository.createOrderItem(goods.id, orderListId, {
    price,
    discountRate,
    state,
    amount: orderedItem.amount,
  });
}

export const OrderService = {
  getOrders,
  createOrder,
};
