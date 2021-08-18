import { Goods } from './../entity/Goods';
import { OrderItem } from './../entity/OrderItem';
import { CreateOrderBody } from './../types/request/order.request';
import { OrderList } from '../entity/OrderList';
import { OrderListRepository } from '../repository/order.list.repository';
import { OrderItemRepository } from '../repository/order.item.repository';
import { GoodsRepository } from '../repository/goods.repository';
import { BadRequestError } from '../errors/client.error';
import { INVALID_DATA } from '../constants/client-error-name';
import { OrderGoods } from '../types/Order';
import { GetOrderListResponse } from '../types/response/order.response';

type OrderGoodsInfo = OrderItem & {
  goods: Goods;
};

async function getOrders(userId: number): Promise<GetOrderListResponse> {
  const ordersResponse: GetOrderListResponse = [];
  const orders = await OrderListRepository.getOrders(userId);
  await Promise.all(orders.map((order) => processGetOrderData(order, ordersResponse)));
  return ordersResponse;
}

async function createOrder(userId: number, body: CreateOrderBody): Promise<OrderList> {
  const goodsList = [...body.goodsList];
  const newBody = JSON.parse(JSON.stringify({ ...body }));
  delete newBody.goodsList;
  const orderList = await OrderListRepository.createOrder(userId, newBody);
  await Promise.all(goodsList.map((orderedItem) => createOrderItem(orderedItem, orderList.id)));
  return orderList;
}

async function createOrderItem(orderedItem: OrderGoods, orderListId: number): Promise<void> {
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

async function processGetOrderData(order: OrderList, ordersResponse: GetOrderListResponse) {
  const orderItems = await OrderItemRepository.getAllOrderItemByListId(order.id);
  if (orderItems.length < 1) throw new BadRequestError(INVALID_DATA);
  const orderItemInfo = (await OrderItemRepository.findOrderGoodsInfoById(orderItems[0].id)) as OrderGoodsInfo;
  if (!orderItemInfo) throw new BadRequestError(INVALID_DATA);
  const count = orderItems.length - 1;
  const title = `${orderItemInfo.goods.title}외 ${count}건 주문`;
  const thumbnailUrl = orderItemInfo.goods.thumbnailUrl;
  ordersResponse.push({ ...order, title, thumbnailUrl });
}

export const OrderService = {
  getOrders,
  createOrder,
};
