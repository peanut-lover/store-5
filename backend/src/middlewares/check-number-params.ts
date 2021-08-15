import { NextFunction, Request, Response } from 'express';
import { BadRequestError } from '../errors/client.error';

export default function checkNumberInParams(req: Request, res: Response, next: NextFunction) {
  const paramId = Number(req.params.id);
  if (isNaN(paramId)) {
    throw new BadRequestError('params should be number');
  }
  next();
}
