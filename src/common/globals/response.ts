import { ErrorCode } from './error-code';

export type HttpExceptionResponse = {
  code: ErrorCode;
  message: any;
};

export type HttpExceptionResponseError = HttpExceptionResponse & {
  statusCode: number;
};

export type Response<T> =
  | {
      success: true;
      data: T | null;
      error: null;
    }
  | {
      success: false;
      data: null;
      error: HttpExceptionResponseError;
    };
