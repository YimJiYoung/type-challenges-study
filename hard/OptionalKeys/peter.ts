/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type OptionalKeys<T> = keyof T extends infer F
  ? F extends keyof T
    ? Pick<T, F> extends { [key in F]: any }
      ? never
      : F
    : never
  : never;

type cases = [
  Expect<Equal<OptionalKeys<{ a: number; b?: string }>, 'b'>>,
  Expect<Equal<OptionalKeys<{ a: undefined; b?: undefined }>, 'b'>>,
  Expect<Equal<OptionalKeys<{ a: undefined; b?: undefined; c?: string; d?: null }>, 'b' | 'c' | 'd'>>,
  Expect<Equal<OptionalKeys<{}>, never>>
];
