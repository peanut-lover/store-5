import { Goods } from './../entity/Goods';
import { OrderItem } from './../entity/OrderItem';
import { CreateOrderBody } from './../types/request/order.request';
import { Order } from '../entity/Order';
import { OrderListRepository } from '../repository/order.list.repository';
import { OrderItemRepository } from '../repository/order.item.repository';
import { GoodsRepository } from '../repository/goods.repository';
import { BadRequestError } from '../errors/client.error';
import { INVALID_DATA } from '../constants/client.error.name';
import { GetAllOrderByUserIdProps, OrderGoods } from '../types/Order';
import { OrderListPaginationResponse } from '../types/response/order.response';
import { getTotalPage, pagination } from '../utils/pagination';
import { PaginationProps } from '../types/Pagination';
import { PaymentRepository } from '../repository/payment.repository';

async function getOwnOrdersPagination(
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

  return {
    meta: {
      page: newPage,
      limit,
      totalPage: getTotalPage(totalCount, limit),
      totalCount,
    },
    orderList: orders,
  };
}

async function getAllOrdersPagination({ page, limit }: GetAllOrderByUserIdProps): Promise<OrderListPaginationResponse> {
  const totalCount = await OrderListRepository.getAllOrderTotalCount();

  const newPage = Math.min(getTotalPage(totalCount, limit), page);

  const option: PaginationProps = {
    offset: pagination.calculateOffset(newPage, limit),
    limit,
  };

  const orders = await OrderListRepository.getAllOrdersPagination(option);

  return {
    meta: {
      page: newPage,
      limit,
      totalPage: getTotalPage(totalCount, limit),
      totalCount,
    },
    orderList: orders,
  };
}

async function createOrder(userId: number, body: CreateOrderBody): Promise<Order> {
  const validateResult = await validateCreateOrder(body);
  if (!validateResult) throw new BadRequestError(INVALID_DATA);
  const { orderMemo, receiver, zipCode, address, subAddress, paymentId, goodsList } = body;
  const order = await OrderListRepository.createOrder(userId, {
    orderMemo,
    receiver,
    zipCode,
    address,
    subAddress,
    paymentId,
  });
  await Promise.all(goodsList.map((orderedItem) => createOrderItem(orderedItem, order.id)));
  return order;
}

async function createOrderItem(orderedItem: OrderGoods, orderId: number): Promise<void> {
  const goods = await GoodsRepository.findGoodsDetailById(orderedItem.id);
  if (!goods) throw new BadRequestError(INVALID_DATA + `(id:${orderId}는 존재하지않는 상품입니다.)`);

  const { price, discountRate, state } = goods;
  await OrderItemRepository.createOrderItem(goods.id, orderId, {
    price,
    discountRate,
    state,
    amount: orderedItem.amount,
  });
}

async function validateCreateOrder(body: CreateOrderBody): Promise<boolean> {
  const { orderMemo, receiver, zipCode, address, subAddress, paymentId, goodsList } = body;
  if (!orderMemo || !receiver || !zipCode || !address || !subAddress || !paymentId || !goodsList) return false;
  const payment = await PaymentRepository.getPaymentById(paymentId);
  if (!payment) return false;
  return true;
}

export const OrderService = {
  getAllOrdersPagination,
  getOwnOrdersPagination,
  createOrder,
};
