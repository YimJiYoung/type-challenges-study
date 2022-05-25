type ReplaceAll<S extends string, From extends string, To extends string> = From extends '' ? S : S extends `${infer O}${From}${infer P}` ? `${O}${To}${ReplaceAll<P,From,To>}` : S


import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
    Expect<Equal<ReplaceAll<'foobar', 'bar', 'foo'>, 'foofoo'>>,
    Expect<Equal<ReplaceAll<'foobar', 'bag', 'foo'>, 'foobar'>>,
    Expect<Equal<ReplaceAll<'foobarbar', 'bar', 'foo'>, 'foofoofoo'>>,
    Expect<Equal<ReplaceAll<'t y p e s', ' ', ''>, 'types'>>,
    Expect<Equal<ReplaceAll<'foobarbar', '', 'foo'>, 'foobarbar'>>,
    Expect<Equal<ReplaceAll<'barfoo', 'bar', 'foo'>, 'foofoo'>>,
    Expect<Equal<ReplaceAll<'foobarfoobar', 'ob', 'b'>, 'fobarfobar'>>,
    Expect<Equal<ReplaceAll<'foboorfoboar', 'bo', 'b'>, 'foborfobar'>>,
    Expect<Equal<ReplaceAll<'', '', ''>, ''>>,
]



// `${infer O}${From}${infer P}` -> `${O}${To}${ReplaceAll<P,From,To>}`

// O: t P: y p e s
// O: y P: p e s
// O: p P: e s
// O: e P: s

