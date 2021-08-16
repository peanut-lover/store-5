import { Payment } from './../entity/Payment';
import { CreateOrderBody } from './../types/request/order.request';
import { OrderList } from '../entity/OrderList';
import { getRepository } from 'typeorm';
import { DatabaseError } from '../errors/base.error';
import { ORDER_LIST_DB_ERROR } from '../constants/database-error-name';

// TODO: thumbnail, 제목 : 볼펜 에디션 외 4건 이런식으로? 팀원들과 의논해야함.
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

async function createOrder(userId: number, body: CreateOrderBody) {
  try {
    const orderRepo = getRepository(OrderList);
    const orderList = await orderRepo.create({
      user: userId,
      ...body,
      payment: body.payment.id,
    });
    await orderRepo.insert(orderList);
    return orderList;
  } catch (err) {
    console.error(err);
    throw new DatabaseError(ORDER_LIST_DB_ERROR);
  }
}

export const OrderListRepository = {
  getOrders,
  createOrder,
};
