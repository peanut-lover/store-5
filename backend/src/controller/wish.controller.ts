import { Request, Response } from 'express';
import WishService from '../service/wish.service';

async function createWish(req: Request, res: Response) {
  const userId = 1;
  const goodsId = req.body.goodsId;
  const result = await WishService.createWish(userId, goodsId);
  res.status(201).json({ result });
}

async function deleteWish(req: Request, res: Response) {
  const userId = 1;
  const goodsId = Number(req.params.goodsId);
  await WishService.deleteWish(userId, goodsId);
  res.sendStatus(204);
}

export default {
  createWish,
  deleteWish,
};
