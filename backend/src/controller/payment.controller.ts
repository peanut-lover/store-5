import { Request, Response } from 'express';
import { PaymentService } from '../service/payment.service';
async function getPayments(req: Request, res: Response) {
  const result = await PaymentService.getPayments();
  res.status(200).json({ result });
}

async function createPayment(req: Request, res: Response) {
  const body = req.body;
  const result = await PaymentService.createPayment(body);
  res.status(201).json({ result });
}

export const PaymentController = {
  getPayments,
  createPayment,
};
