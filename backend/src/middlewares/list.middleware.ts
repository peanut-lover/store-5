import { NextFunction, Request, Response } from 'express';

export default function setGoodsListFromParams(req: Request, res: Response, next: NextFunction) {
  const { category, page, flag = 'createdAt', limit, state = 'S' } = req.query;
  req.goodsListParams = {
    category: Number(category),
    page: Number(page),
    flag: String(flag),
    limit: Number(limit),
    state: String(state),
    userId: req.userId,
  };
  next();
}
