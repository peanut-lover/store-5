import { Payment } from './../entity/Payment';
import { getRepository } from 'typeorm';
async function getPayments(): Promise<Payment[]> {
  const paymentRepo = getRepository(Payment);
  return await paymentRepo.find({});
}

async function getPaymentFromNameAndType(name: string, type: string): Promise<Payment | undefined> {
  const paymentRepo = getRepository(Payment);
  return await paymentRepo.findOne({ where: { name, type } });
}

async function createPayment(name: string, type: string): Promise<Payment> {
  const paymentRepo = getRepository(Payment);
  return await paymentRepo.save({ name, type });
}

export const PaymentRepository = {
  getPayments,
  getPaymentFromNameAndType,
  createPayment,
};
