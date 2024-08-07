import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import {
  Environment,
  ErrorCode,
  HttpExceptionResponse,
  HttpExceptionResponseError,
} from '@globals';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly _httpAdapterHost: HttpAdapterHost) {}

  catch(exception: any, host: ArgumentsHost) {


    const error: HttpExceptionResponseError = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      code: ErrorCode.UNKNOWN,
      message: exception.message,
    };

    if (exception instanceof HttpException) {
      error.statusCode = exception.getStatus();
      const response = exception.getResponse();

      if (typeof response === 'string') error.message = response;
      else {
        error.code = (response as HttpExceptionResponse).code || error.code;
        error.message = (response as HttpExceptionResponse).message;
      }
    }

    const context = host.switchToHttp();

    this._httpAdapterHost.httpAdapter.reply(
      context.getResponse(),
      {
        success: false,
        data: null,
        error,
      },
      error.statusCode,
    );
  }
}
