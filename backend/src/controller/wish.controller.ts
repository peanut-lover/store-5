import { Request, Response } from 'express';
import WishService from '../service/wish.service';

async function createWish(req: Request, res: Response) {
  const userId = req.userId;
  const goodsId = Number(req.params.id);
  const result = await WishService.createWish(userId, goodsId);
  res.status(201).json({ result });
}

async function deleteWish(req: Request, res: Response) {
  const userId = req.userId;
  const goodsId = Number(req.params.id);
  await WishService.deleteWish(userId, goodsId);
  res.sendStatus(204);
}

export default {
  createWish,
  deleteWish,
};
