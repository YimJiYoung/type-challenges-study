import type { Equal, Expect } from '@type-challenges/utils';

type TargetCharacter = ' ' | '\t' | '\n\t';
type Trim<S extends string> = S extends `${TargetCharacter}${infer Rest}`
  ? Trim<Rest>
  : S extends `${infer Value}${TargetCharacter}`
  ? Trim<Value>
  : S;

type Hello = Trim<' hello'>;
type cases = [
  Expect<Equal<Trim<'str'>, 'str'>>,
  Expect<Equal<Trim<' str'>, 'str'>>,
  Expect<Equal<Trim<'     str'>, 'str'>>,
  Expect<Equal<Trim<'str   '>, 'str'>>,
  Expect<Equal<Trim<'     str     '>, 'str'>>,
  Expect<Equal<Trim<'   \n\t foo bar \t'>, 'foo bar'>>,
  Expect<Equal<Trim<''>, ''>>,
  Expect<Equal<Trim<' \n\t '>, ''>>
];
