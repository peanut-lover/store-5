import { Response, NextFunction, Request } from 'express';

const GUEST = -1;

export default function setAuthenticate(req: Request, res: Response, next: NextFunction) {
  const { userId } = req.session;
  req.userId = userId ?? GUEST;
  next();
}
