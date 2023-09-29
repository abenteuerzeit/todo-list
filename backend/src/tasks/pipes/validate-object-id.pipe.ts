import { PipeTransform, BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';

export class ValidateObjectId implements PipeTransform<string> {
  async transform(value: string): Promise<string> {
    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException('Invalid ID!');
    }
    return value;
  }
}
