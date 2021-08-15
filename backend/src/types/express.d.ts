import { GetAllByCategoryProps } from './Goods';

export {};

declare global {
  namespace Express {
    interface Request {
      userId: number;
      goodsListParams: GetAllByCategoryProps;
    }
  }
}

declare module 'express-session' {
  export interface SessionData {
    userId: number;
  }
}
