import { ValidationError } from 'class-validator';
import { BadRequestException, BaseException } from '../exceptions';

export const exceptionFactory = (errors: ValidationError[]): BaseException => {
  return new BadRequestException(errors);
};
