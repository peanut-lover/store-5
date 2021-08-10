import { UserFacingError } from "./base.error.js";

export class BadRequestError extends UserFacingError {
  constructor(message, options = {}) {
    super(message);
    for (const [key, value] of Object.entries(options)) {
      this[key] = value;
    }
  }

  get statusCode() {
    return 400;
  }
}

export class ForbiddenError extends UserFacingError {
  constructor(message, options = {}) {
    super(message);
    for (const [key, value] of Object.entries(options)) {
      this[key] = value;
    }
  }

  get statusCode() {
    return 403;
  }
}

export class NotFoundError extends UserFacingError {
  constructor(message, options = {}) {
    super(message);
    for (const [key, value] of Object.entries(options)) {
      this[key] = value;
    }
  }
  get statusCode() {
    return 404;
  }
}
