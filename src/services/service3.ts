import { Either, left } from 'fp-ts/Either';
import {service4, Service4Class} from './service4';
import {CustomError, WrapErrors, wrapErrors} from '../utils';
import {ErrorStack} from "../ErrorStack";

export const service3 = (name: string): Either<ErrorStack, string> => {
  return wrapErrors(service4(name), 'Error on service 3');
};

export class Service3Class {
  readonly s4: Service4Class;

  constructor(s4: Service4Class){
    this.s4 = s4;
  }

  @WrapErrors()
  service3(name: string): Either<CustomError, string> {
    return this.s4.service4(name);
  }
}