import { Response, NextFunction, Request } from 'express';
import { FORBIDDEN } from '../constants/client-error-name';
import { ForbiddenError } from '../errors/client.error';

export default function isAuthenticate(req: Request, res: Response, next: NextFunction) {
  const { userId } = req.session;
  if (!userId) throw new ForbiddenError(FORBIDDEN);
  req.userId = userId;
  next();
}
