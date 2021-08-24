import { CreateOrder } from './../types/request/order.request';
import { Order } from '../entity/Order';
import { getRepository, EntityManager } from 'typeorm';
import { DatabaseError } from '../errors/base.error';
import { ORDER_LIST_DB_ERROR } from '../constants/database.error.name';
import { PaginationProps } from '../types/Pagination';

const DEFAULT_ORDER_STATE = '주문완료';

async function getOrders(userId: number): Promise<Order[]> {
  try {
    const orderRepo = getRepository(Order);
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
  return await getRepository(Order).count({
    where: {
      user: {
        id: userId,
      },
    },
  });
}

async function getOwnOrdersPagination({ offset, limit }: PaginationProps, userId: number): Promise<Order[]> {
  try {
    return await getRepository(Order).find({
      relations: ['payment', 'orderItems', 'orderItems.goods', 'user'],
      where: {
        user: { id: userId },
      },
      skip: offset,
      take: limit,
      order: {
        createdAt: 'DESC',
      },
    });
  } catch (err) {
    console.error(err);
    throw new DatabaseError(ORDER_LIST_DB_ERROR);
  }
}

async function getAllOrderTotalCount(): Promise<number> {
  return await getRepository(Order).count();
}

async function getAllOrdersPagination({ offset, limit }: PaginationProps): Promise<Order[]> {
  try {
    return await getRepository(Order).find({
      relations: ['payment', 'orderItems', 'orderItems.goods', 'user'],
      skip: offset,
      take: limit,
      order: {
        createdAt: 'DESC',
      },
    });
  } catch (err) {
    console.error(err);
    throw new DatabaseError(ORDER_LIST_DB_ERROR);
  }
}

async function createOrder(
  transactionalEntityManager: EntityManager,
  userId: number,
  body: CreateOrder
): Promise<Order> {
  try {
    const { orderMemo, receiver, zipCode, address, subAddress, paymentId } = body;

    return await transactionalEntityManager.save(Order, {
      user: {
        id: userId,
      },
      orderMemo,
      receiver,
      zipCode,
      address,
      subAddress,
      state: DEFAULT_ORDER_STATE,
      payment: { id: paymentId },
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
  getAllOrderTotalCount,
  getAllOrdersPagination,
  createOrder,
};
