import { Goods } from './../entity/Goods';
import { OrderItem } from './../entity/OrderItem';
import { CreateOrderBody } from './../types/request/order.request';
import { OrderList } from '../entity/OrderList';
import { OrderListRepository } from '../repository/order.list.repository';
import { OrderItemRepository } from '../repository/order.item.repository';
import { GoodsRepository } from '../repository/goods.repository';
import { BadRequestError } from '../errors/client.error';
import { INVALID_DATA } from '../constants/client.error.name';
import { GetAllOrderByUserIdProps, OrderGoods } from '../types/Order';
import { OrderListPaginationResponse, OrderListWithThumbnail } from '../types/response/order.response';
import { getTotalPage, pagination } from '../utils/pagination';
import { PaginationProps } from '../types/Pagination';
import { PaymentRepository } from '../repository/payment.repository';

type OrderGoodsInfo = OrderItem & {
  goods: Goods;
};

async function getOrdersPagination(
  { page, limit }: GetAllOrderByUserIdProps,
  userId: number
): Promise<OrderListPaginationResponse> {
  const totalCount = await OrderListRepository.getOwnOrderTotalCount(userId);

  const newPage = Math.min(getTotalPage(totalCount, limit), page);

  const option: PaginationProps = {
    offset: pagination.calculateOffset(newPage, limit),
    limit,
  };
  const orders = await OrderListRepository.getOwnOrdersPagination(option, userId);

  const processedOrderList = await Promise.all(orders.map((order) => processAppendingThumbnailAndTitle(order)));

  return {
    meta: {
      page: newPage,
      limit,
      totalPage: getTotalPage(totalCount, limit),
      totalCount,
    },
    orderList: processedOrderList,
  };
}

async function createOrder(userId: number, body: CreateOrderBody): Promise<OrderList> {
  const validateResult = await validateCreateOrder(body);
  if (!validateResult) throw new BadRequestError(INVALID_DATA);
  const { orderMemo, receiver, zipCode, address, subAddress, paymentId, goodsList } = body;
  const orderList = await OrderListRepository.createOrder(userId, {
    orderMemo,
    receiver,
    zipCode,
    address,
    subAddress,
    paymentId,
  });
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

async function processAppendingThumbnailAndTitle(order: OrderList): Promise<OrderListWithThumbnail> {
  const orderItems = await OrderItemRepository.getAllOrderItemByListId(order.id);
  if (orderItems.length < 1) throw new BadRequestError(INVALID_DATA);

  // 가장 맨 처음 탐색되는 주문 아이템이 thumbnail이 된다.
  const orderItemInfo = await OrderItemRepository.findOrderGoodsInfoById(orderItems[0].id);
  if (!orderItemInfo) throw new BadRequestError(INVALID_DATA);

  const count = orderItems.length - 1;
  const title = createOrderTitle(orderItemInfo.goods.title, count);
  const thumbnailUrl = orderItemInfo.goods.thumbnailUrl;

  return {
    ...order,
    title,
    thumbnailUrl,
  };
}

function createOrderTitle(title: string, count: number): string {
  const orderTitle = count > 0 ? `${title} 외 ${count}건 주문` : `${title} 주문`;
  return orderTitle;
}

async function validateCreateOrder(body: CreateOrderBody): Promise<boolean> {
  const { orderMemo, receiver, zipCode, address, subAddress, paymentId, goodsList } = body;
  if (!orderMemo || !receiver || !zipCode || !address || !subAddress || !paymentId || !goodsList) return false;
  const payment = await PaymentRepository.getPaymentById(paymentId);
  if (!payment) return false;
  return true;
}

export const OrderService = {
  getOrdersPagination,
  createOrder,
};
