import {BadRequestException, CallHandler, ExecutionContext, Injectable, NestInterceptor} from '@nestjs/common';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ValidationException} from '../../util/exception/validation.exception';

@Injectable()
export class ExceptionMappingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(err => {
        if (err instanceof ValidationException) {
          return throwError(new BadRequestException(err.toString()));
        }
        return throwError(err);
      })
    );
  }
}
