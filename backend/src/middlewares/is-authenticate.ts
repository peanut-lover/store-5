import { Response, NextFunction, Request } from 'express';
import { FORBIDDEN } from '../constants/client-error-name';
import { ForbiddenError } from '../errors/client.error';

declare module 'express-session' {
  export interface SessionData {
    userId: number | null;
  }
}

export default function isAuthenticate(req: Request, res: Response, next: NextFunction) {
  const { userId } = req.session;
  if (!userId) throw new ForbiddenError(FORBIDDEN);
  next();
}
