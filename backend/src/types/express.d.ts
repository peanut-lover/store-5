export {};

declare global {
  namespace Express {
    interface Request {
      userId: number;
    }
  }
}

declare module 'express-session' {
  export interface SessionData {
    userId: number;
  }
}
