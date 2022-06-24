import type { Equal, Expect } from '@type-challenges/utils';

// NOTE: typescript 4.7 버전에서 infer 타입에 extends 사용 가능
// 참고 : https://devblogs.microsoft.com/typescript/announcing-typescript-4-7/#extends-constraints-on-infer-type-variables

// type PercentageParser<PString extends string> = PString extends `${infer Sign extends '-' | '+'}${infer Rest}` ?
//     Rest extends `${infer Num}%` ?
//         [Sign, Num, '%'] : [Sign, Rest, '']
//     : PString extends `${infer Num}%` ?  ['', Num, '%'] : ['' , PString, ''];

type SignParser<A extends string> = A extends `+${infer Rest}`
  ? ['+', Rest]
  : A extends `-${infer Rest}`
  ? ['-', Rest]
  : ['', A];

type PercentParser<A extends string> = A extends `${infer Rest}%` ? [Rest, '%'] : [A, ''];

type PercentageParser<A extends string> = [SignParser<A>[0], ...PercentParser<SignParser<A>[1]>];

// type PercentageParser<A extends string,
//     Sign extends string = A extends `${infer Sign extends '+' | '-'}${string}` ? Sign : '',
//     Percent extends string = A extends `${string}%` ? '%' : '',
//     > = A extends `${Sign}${infer Value}${Percent}` ? (
//     [Sign, Value, Percent]
//     ) : [Sign, '', Percent]

type Case0 = ['', '', ''];
type Case1 = ['+', '', ''];
type Case2 = ['+', '1', ''];
type Case3 = ['+', '100', ''];
type Case4 = ['+', '100', '%'];
type Case5 = ['', '100', '%'];
type Case6 = ['-', '100', '%'];
type Case7 = ['-', '100', ''];
type Case8 = ['-', '1', ''];
type Case9 = ['', '', '%'];
type Case10 = ['', '1', ''];
type Case11 = ['', '100', ''];

type cases = [
  Expect<Equal<PercentageParser<''>, Case0>>,
  Expect<Equal<PercentageParser<'+'>, Case1>>,
  Expect<Equal<PercentageParser<'+1'>, Case2>>,
  Expect<Equal<PercentageParser<'+100'>, Case3>>,
  Expect<Equal<PercentageParser<'+100%'>, Case4>>,
  Expect<Equal<PercentageParser<'100%'>, Case5>>,
  Expect<Equal<PercentageParser<'-100%'>, Case6>>,
  Expect<Equal<PercentageParser<'-100'>, Case7>>,
  Expect<Equal<PercentageParser<'-1'>, Case8>>,
  Expect<Equal<PercentageParser<'%'>, Case9>>,
  Expect<Equal<PercentageParser<'1'>, Case10>>,
  Expect<Equal<PercentageParser<'100'>, Case11>>
];
