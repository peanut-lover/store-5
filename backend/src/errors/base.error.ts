export class ApplicationError extends Error {
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
