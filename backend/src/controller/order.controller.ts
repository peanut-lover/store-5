import { OrderService } from './../service/order.service';
import { Request, Response } from 'express';
import { CreateOrderRequest } from '../types/request/order.request';
import { GetAllOrderByUserIdProps } from '../types/Order';
import { BadRequestError } from '../errors/client.error';
import { INVALID_DATA } from '../constants/client.error.name';

async function getOwnOrdersPagination(req: Request, res: Response) {
  const { page, limit } = req.query;
  if (page === undefined || limit === undefined) {
    throw new BadRequestError(INVALID_DATA);
  }
  const userId = req.userId;
  const OrderListQueryParams: GetAllOrderByUserIdProps = {
    page: Number(page),
    limit: Number(limit),
  };
  const result = await OrderService.getOwnOrdersPagination(OrderListQueryParams, userId);
  res.status(200).send({ result });
}

async function getAllOrdersPagination(req: Request, res: Response) {
  const { page, limit } = req.query;
  if (page === undefined || limit === undefined) {
    throw new BadRequestError(INVALID_DATA);
  }

  const OrderListQueryParams: GetAllOrderByUserIdProps = {
    page: Number(page),
    limit: Number(limit),
  };
  const result = await OrderService.getAllOrdersPagination(OrderListQueryParams);
  res.status(200).send({ result });
}

async function createOrder(req: CreateOrderRequest, res: Response) {
  const userId = req.userId;
  const body = req.body;
  const result = await OrderService.createOrder(userId, body);
  res.status(200).send(result);
}

export const OrderController = {
  getOwnOrdersPagination,
  getAllOrdersPagination,
  createOrder,
};
