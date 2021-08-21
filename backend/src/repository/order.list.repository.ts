import { CreateOrder } from './../types/request/order.request';
import { OrderList } from '../entity/OrderList';
import { getRepository } from 'typeorm';
import { DatabaseError } from '../errors/base.error';
import { ORDER_LIST_DB_ERROR } from '../constants/database-error-name';
import { PaginationProps } from '../types/Pagination';

const DEFAULT_ORDER_STATE = '주문완료';

async function getOrders(userId: number): Promise<OrderList[]> {
  try {
    const orderRepo = getRepository(OrderList);
    return await orderRepo.find({
      relations: ['payment', 'orderItems'],
      where: {
        user: { id: userId },
      },
    });
  } catch (err) {
    console.error(err);
    throw new DatabaseError(ORDER_LIST_DB_ERROR);
  }
}

async function getOwnOrderTotalCount(userId: number): Promise<number> {
  return await getRepository(OrderList).count({
    where: {
      user: {
        id: userId,
      },
    },
  });
}

async function getOwnOrdersPagination({ offset, limit }: PaginationProps, userId: number): Promise<OrderList[]> {
  try {
    return await getRepository(OrderList).find({
      relations: ['payment', 'orderItems', 'orderItems.goods'],
      where: {
        user: { id: userId },
      },
      skip: offset,
      take: limit,
    });
  } catch (err) {
    console.error(err);
    throw new DatabaseError(ORDER_LIST_DB_ERROR);
  }
}

async function createOrder(userId: number, body: CreateOrder): Promise<OrderList> {
  try {
    // id created  order_item_id=1 order_item_goods
    // id created  order_item_id=2 order_item_goods
    // id created  order_item_id=3 order_item_goods

    const orderRepo = getRepository(OrderList);
    return await orderRepo.save({
      user: {
        id: userId,
      },
      ...body,
      state: DEFAULT_ORDER_STATE,
      payment: { id: body.paymentId },
    });
  } catch (err) {
    console.error(err);
    throw new DatabaseError(ORDER_LIST_DB_ERROR);
  }
}

export const OrderListRepository = {
  getOrders,
  getOwnOrderTotalCount,
  getOwnOrdersPagination,
  createOrder,
};
