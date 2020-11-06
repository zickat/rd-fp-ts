import { Either, left, Left, right, Right } from 'fp-ts/Either';
import { isLeft } from 'fp-ts/es6/Either';

export declare function pipeAllEitherAsync<E, A>(
  p1: Promise<Either<E, A>>,
): Promise<Right<[A]> | Left<Array<E>>>;
export declare function pipeAllEitherAsync<E, A, B>(
  p1: Promise<Either<E, A>>,
  p2: Promise<Either<E, B>>,
): Promise<Right<[A, B]> | Left<Array<E>>>;
export declare function pipeAllEitherAsync<E, A, B, C>(
  p1: Promise<Either<E, A>>,
  p2: Promise<Either<E, B>>,
  p3: Promise<Either<E, C>>,
): Promise<Right<[A, B, C]> | Left<Array<E>>>;

export const pipeAllEitherAsyncImpl = async (
  ...promises: Array<Promise<Either<any, any>>>
): Promise<Right<Array<any>> | Left<Array<any>>> => {
  const rights: Array<any> = [];
  const lefts: Array<any> = [];

  const res = await Promise.all(promises);

  res.forEach(_ => {
    if (isLeft(_)) {
      lefts.push(_);
    } else {
      rights.push(_);
    }
  });

  if (lefts.length > 0) {
    return left(lefts);
  }

  return right(rights);
};


// type TypedArray<A, T> = [A, ...T extends [infer I, ...infer J] ? TypedArray<I, J> : []]
//
// const t: TypedArray = [1, 'toto', 'tata'];