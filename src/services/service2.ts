import { Either, right } from 'fp-ts/Either';
import { ErrorStack } from '../ErrorStack';
import {CustomError, WrapErrors} from '../utils';

export const service2 = (name: string): Either<ErrorStack, string> => {
  return right(`hello ${name}`);
};

export class Service2Class {
  @WrapErrors()
  service2(name: string): Either<CustomError, string> {
    return right(`hello ${name}`);
  }
}
