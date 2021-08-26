import { DatabaseError, UserFacingError } from './../errors/base.error';
import { Response, NextFunction, Request } from 'express';

export default function errorControl(err: Error, req: Request, res: Response, next: NextFunction) {
  let statusCode = null;
  if (err instanceof DatabaseError || err instanceof UserFacingError) {
    statusCode = err.statusCode;
  }

  if (!statusCode) {
    statusCode = 500;
    next(err);
  }
  const message = err.message;
  res.status(statusCode).send({ status: statusCode, message: message });
}
