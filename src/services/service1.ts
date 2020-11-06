import { chain, Either, mapLeft } from 'fp-ts/Either';
import { service2, Service2Class } from './service2';
import { service3, Service3Class } from './service3';
import { pipe } from 'fp-ts/pipeable';
import {WrapErrors, wrapErrors} from '../utils';
import { ErrorStack } from '../ErrorStack';

export const service1 = (name: string): Either<ErrorStack, string> => {
  return wrapErrors(
    pipe(service2(name), chain(service3)),
    'Error on Service 1',
  );
};

export class Service1Class {
  readonly s2: Service2Class;
  readonly s3: Service3Class;

  constructor(s2: Service2Class, s3: Service3Class) {
    this.s2 = s2;
    this.s3 = s3;
  }

  @WrapErrors()
  service1(name: string) {
    return pipe(
      this.s2.service2(name),
      chain(name => this.s3.service3(name)),
    );
  }
}
