import { Either, left, Left, right, Right } from 'fp-ts/Either';
import { isLeft } from 'fp-ts/es6/Either';

export const pipeAsync1 = <A>(a: A) => {
  return a;
};

export const pipeAsync2 = async <A, B>(
  a: A | Promise<A>,
  ab: (a: A) => B | Promise<B>,
): Promise<B> => {
  return ab(await a);
};

export const pipeAsync3 = async <A, B, C>(
  a: A | Promise<A>,
  ab: (a: A) => B | Promise<B>,
  bc: (b: B) => C,
): Promise<C> => {
  return bc(await pipeAsync2(a, ab));
};

export declare function pipeAsync<A>(a: A | Promise<A>): Promise<A>;
export declare function pipeAsync<A, B>(
  a: A | Promise<A>,
  ab: (a: A) => Promise<B>,
): Promise<B>;
export declare function pipeAsync<A, B, C>(
  a: A | Promise<A>,
  ab: (a: A) => Promise<B>,
  cb: (b: B) => Promise<C>,
): Promise<C>;
export declare function pipeAsync<A, B, C, D>(
  a: A | Promise<A>,
  ab: (a: A) => Promise<B>,
  cb: (b: B) => Promise<C>,
  cd: (c: C) => Promise<D>,
): Promise<C>;
export declare function pipeAsync<A, B, C, D, E>(
  a: A | Promise<A>,
  ab: (a: A) => Promise<B>,
  cb: (b: B) => Promise<C>,
  cd: (c: C) => Promise<D>,
  de: (d: D) => Promise<E>,
): Promise<C>;

export const pipeAsyncImpl = async (
  a: any,
  ...args: ((a: any) => any | Promise<any>)[]
): Promise<any> => {
  if ((args.length = 0)) {
    return await a;
  }

  const fn = [...args];
  const f = fn[fn.length - 1];
  fn.pop();

  return f(await pipeAsyncImpl(a, ...fn));
};
