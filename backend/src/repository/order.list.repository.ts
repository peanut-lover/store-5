import { CreateOrderBody } from './../types/request/order.request';
import { OrderList } from '../entity/OrderList';
import { getRepository } from 'typeorm';
import { DatabaseError } from '../errors/base.error';
import { ORDER_LIST_DB_ERROR } from '../constants/database-error-name';
import { PaginationProps } from '../types/Pagination';

// TODO: thumbnail, 제목 : 볼펜 에디션 외 4건 이런식으로? 팀원들과 의논해야함.
// 나중으로 일단 미룸
const DEFAULT_ORDER_STATE = '주문완료';

async function getOrders(userId: number): Promise<OrderList[]> {
  try {
    const orderRepo = getRepository(OrderList);
    return await orderRepo.find({
      relations: ['payment'],
      where: {
        user: userId,
      },
    });
  } catch (err) {
    console.error(err);
    throw new DatabaseError(ORDER_LIST_DB_ERROR);
  }
}

async function getOwnOrderTotalCount(userId: number): Promise<number> {
  return await getRepository(OrderList).count();
}

async function getOwnOrdersPagination({ offset, limit }: PaginationProps, userId: number): Promise<OrderList[]> {
  try {
    return await getRepository(OrderList).find({
      relations: ['payment'],
      where: {
        user: userId,
      },
      skip: offset,
      take: limit,
    });
  } catch (err) {
    console.error(err);
    throw new DatabaseError(ORDER_LIST_DB_ERROR);
  }
}

async function createOrder(userId: number, body: CreateOrderBody): Promise<OrderList> {
  try {
    const orderRepo = getRepository(OrderList);
    return await orderRepo.save({
      user: userId,
      ...body,
      state: DEFAULT_ORDER_STATE,
      payment: body.paymentId,
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
