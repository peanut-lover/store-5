import { EXISTED } from './../constants/client-error-name';
import { BadRequestError } from '../errors/client.error';
import { PaymentRepository } from './../repository/payment.repository';
import { CreatePaymentBody } from '../types/request/payment.request';
import { Payment } from '../entity/Payment';
async function getPayments(): Promise<Payment[]> {
  return await PaymentRepository.getPayments();
}

async function createPayment(body: CreatePaymentBody): Promise<Payment> {
  const { name, type } = body;
  await checkAlreadyExisted(name, type);
  return await PaymentRepository.createPayment(name, type);
}

async function checkAlreadyExisted(name: string, type: string): Promise<void> {
  const payment = await PaymentRepository.getPaymentFromNameAndType(name, type);
  if (payment) throw new BadRequestError(EXISTED);
}

export const PaymentService = {
  getPayments,
  createPayment,
};
