import {Module} from '@nestjs/common';
import {ExceptionMappingInterceptor} from './interceptor/exception-mapping.interceptor';
import {APP_INTERCEPTOR, APP_PIPE} from '@nestjs/core';
import {TransformationPipe} from './pipe/transformation.pipe';

@Module({
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ExceptionMappingInterceptor, // app-global
    },
    {
      provide: APP_PIPE,
      useClass: TransformationPipe, // app-global
    }
  ]
})
export class CommonModule {
}
