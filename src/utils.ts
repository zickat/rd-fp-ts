import { Either, mapLeft } from 'fp-ts/Either';
import { ErrorStack } from './ErrorStack';

export const wrapErrors = <A>(
  either: Either<ErrorStack | Error, A>,
  errorMessage: string,
): Either<ErrorStack, A> => {
  return mapLeft((e: ErrorStack | Error) => {
    return ErrorStack.fromErrorAndMessage(e, errorMessage);
  })(either);
};

export type CustomError = Error | ErrorStack;

export function WrapErrors() {
  return function(
    target: Object,
    key: string | symbol,
    descriptor: PropertyDescriptor,
  ) {
    const original = descriptor.value;

    descriptor.value = function(...args: any[]) {
      return wrapErrors(
        original.apply(this, args),
        `${target.constructor.name}.${key.toString()}`,
      );
    };

    return descriptor;
  };
}
