import { OrderService } from './../service/order.service';
import { Request, Response } from 'express';
import { CreateOrderRequest } from '../types/request/order.request';
async function getOrders(req: Request, res: Response) {
  const userId = req.userId;
  const result = await OrderService.getOrders(userId);
  res.status(200).send({ result });
}

async function createOrder(req: CreateOrderRequest, res: Response) {
  const userId = req.userId;
  const body = req.body;
  const result = await OrderService.createOrder(userId, body);
  res.status(200).send({ result });
}

export const OrderController = {
  getOrders,
  createOrder,
};