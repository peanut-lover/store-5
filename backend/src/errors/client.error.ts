import { UserFacingError } from './base.error.js';

export class BadRequestError extends UserFacingError {
  constructor(message: string) {
    super(message);
  }

  get statusCode() {
    return 400;
  }
}

export class ForbiddenError extends UserFacingError {
  constructor(message: string) {
    super(message);
  }

  get statusCode() {
    return 403;
  }
}

export class NotFoundError extends UserFacingError {
  constructor(message: string) {
    super(message);
  }
  get statusCode() {
    return 404;
  }
}
