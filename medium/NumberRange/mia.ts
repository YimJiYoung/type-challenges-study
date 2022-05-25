// SequenceImpl<N, [], false> : [0, ..., N-1] 배열 타입
// SequenceImpl<N, [], true> : [0, ..., N] 배열 타입
type Sequence<N extends number, Seq extends number[], includeN extends boolean> = Seq['length'] extends N
  ? includeN extends true
    ? [...Seq, Seq['length']]
    : Seq
  : Sequence<N, [...Seq, Seq['length']], includeN>;

type ValuesOf<T extends any[]> = T[number];

type NumberRange<L extends number, H extends number> = Exclude<
  ValuesOf<Sequence<H, [], true>>,
  ValuesOf<Sequence<L, [], false>>
>;
