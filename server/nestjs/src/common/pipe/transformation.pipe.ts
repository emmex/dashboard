import {ArgumentMetadata, Injectable, PipeTransform} from '@nestjs/common';
import {plainToClass} from 'class-transformer';

@Injectable()
export class TransformationPipe implements PipeTransform {

  transform(value: any, metadata: ArgumentMetadata) {
    const {metatype} = metadata;
    return plainToClass(metatype, value);
  }

}
