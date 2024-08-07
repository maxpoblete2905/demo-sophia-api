import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  StreamableFile,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Response } from '@globals';

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T> | StreamableFile>
{
  intercept(
    _context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T> | StreamableFile> {
    return next
      .handle()
      .pipe(
        map<T, Response<T> | StreamableFile>((data) =>
          data instanceof StreamableFile
            ? data
            : { success: true, data, error: null },
        ),
      );
  }
}
