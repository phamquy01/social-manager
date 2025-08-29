import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        // Trường hợp trả về là string => coi đó là message
        if (typeof data === 'string') {
          return {
            status: 200,
            message: data,
          };
        }

        // Trường hợp đã định dạng đúng rồi (trả từ ApiResponse.success)
        if (data && data.status && data.message) {
          return data;
        }

        // Trường hợp không có message, chỉ có data
        return {
          status: 200,
          message: 'Success',
          data: data,
        };
      }),
    );
  }
}
