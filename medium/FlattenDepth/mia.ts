import type { Equal, Expect } from '@type-challenges/utils';

type FlattenDepth<Arr, Depth = 1, LengthArr extends unknown[] = []> = LengthArr['length'] extends Depth
  ? Arr
  : Arr extends [infer First, ...infer Rest]
  ? First extends unknown[]
    ? [...FlattenDepth<First, Depth, [...LengthArr, unknown]>, ...FlattenDepth<Rest, Depth, LengthArr>]
    : [First, ...FlattenDepth<Rest, Depth, LengthArr>]
  : Arr;

type cases = [
  Expect<Equal<FlattenDepth<[]>, []>>,
  Expect<Equal<FlattenDepth<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<FlattenDepth<[1, [2]]>, [1, 2]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, [[5]]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 3>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 19260817>, [1, 2, 3, 4, 5]>>
];
