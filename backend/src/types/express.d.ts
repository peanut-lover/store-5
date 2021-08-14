declare global {
  namespace Express {
    interface Request {
      userId: number;
    }
    interface Session {
      userId?: number;
    }
  }
}
