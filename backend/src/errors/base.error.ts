export class ApplicationError extends Error {
  constructor(message: string) {
    const trueProto = new.target.prototype;
    super(message);
    Object.setPrototypeOf(this, trueProto);
  }
  get name() {
    return this.constructor.name;
  }
}

export class UserFacingError extends ApplicationError {
  constructor(message: string) {
    super(message);
  }
  get statusCode() {
    return 400;
  }
}

export class DatabaseError extends ApplicationError {
  constructor(message: string) {
    super(message);
  }
  get statusCode() {
    return 503;
  }
}
