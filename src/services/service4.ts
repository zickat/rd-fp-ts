import { Either, left } from 'fp-ts/Either';
import {CustomError, WrapErrors, wrapErrors} from '../utils';
import { ErrorStack } from '../ErrorStack';

export const service4 = (name: string): Either<ErrorStack, string> => {
  return wrapErrors(
    left(new Error('Error in service 4')),
    'Error on service 4',
  );
};

export class Service4Class {
  @WrapErrors()
  service4(name: string): Either<CustomError, string> {
    return left(new Error('Error in service 4'));
  }
}
