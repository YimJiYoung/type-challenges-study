/* _____________ Test Cases _____________ */
import type { Equal, Expect, ExpectExtends } from '@type-challenges/utils';

type ObjectKeyPaths<T extends object> = keyof T extends infer Key
  ? Key extends keyof T & string
    ? T[Key] extends object
      ?
          | Key
          | (Key extends string
              ? T[Key] extends any[]
                ? `${`${Key}.${number}` | `${Key}[${number}]` | `${Key}.[${number}]`}${
                    | ''
                    | `.${ObjectKeyPaths<T[Key][number]>}`}`
                : `${Key}.${ObjectKeyPaths<T[Key]>}`
              : never)
      : Key
    : never
  : never;

type T = ObjectKeyPaths<typeof ref>;

const ref = {
  count: 1,
  person: {
    name: 'cattchen',
    age: 22,
    twoDeps: {
      age: 1,
    },
    books: ['book1', 'book2'],
    pets: [
      {
        type: 'cat',
      },
    ],
  },
};

type cases = [
  Expect<Equal<ObjectKeyPaths<{ name: string; age: number }>, 'name' | 'age'>>,
  Expect<
    Equal<
      ObjectKeyPaths<{
        refCount: number;
        person: { name: string; age: number };
      }>,
      'refCount' | 'person' | 'person.name' | 'person.age'
    >
  >,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'count'>>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person'>>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.name'>>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.age'>>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.books'>>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.pets'>>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.books.0'>>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.books.1'>>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.books[0]'>>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.books.[0]'>>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.pets.0.type'>>,
  Expect<Equal<ExpectExtends<ObjectKeyPaths<typeof ref>, 'notExist'>, false>>
];
