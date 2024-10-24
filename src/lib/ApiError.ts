import { ErrorCodes } from "./enums";

type ErrorData = {
  code: ErrorCodes;
  [x: string]: any;
} | null;

class ApiError extends Error {
  declare statusCode: number;
  declare isOperational: boolean;
  declare data: ErrorData;

  constructor(
    statusCode: number,
    message: string,
    data: ErrorData = null,
    isOperational = true,
    stack = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.data = data;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
