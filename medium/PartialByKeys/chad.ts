/*
  2757 - PartialByKeys
  -------
  by jiangshan (@jiangshanmeta) #medium #object
  
  ### Question
  
  Implement a generic `PartialByKeys<T, K>` which takes two type argument `T` and `K`.
  
  `K` specify the set of properties of `T` that should set to be optional. When `K` is not provided, it should make all properties optional just like the normal `Partial<T>`.
  
  For example
  
  ```typescript
  interface User {
    name: string
    age: number
    address: string
  }
  
  type UserPartialName = PartialByKeys<User, 'name'> // { name?:string; age:number; address:string }
  ```
  
  > View on GitHub: https://tsch.js.org/2757
*/

/* _____________ Your Code Here _____________ */


type SetObject<T> = { [P in keyof T]: T[P] }

type PartialByKeys<T, K extends keyof T > =  K extends undefined ? Partial<T> : SetObject<{
  [P in keyof T as P extends K ? P:never]? : T[P]
} & {
  [P in keyof T as P extends K ? never : P] : T[P]
}> 



// type PartialByKeys<T, K > = SetObject<{
//   [P in keyof T as P extends K ? P:never]? : T[P]
// } & {
//   [P in keyof T as P extends K ? never : P] : T[P]
// }> 


// type PartialByKeys<T, K > =  {
//   [P in keyof T as P extends K ? P:never]? : T[P]
// } & {
//   [P in keyof T as P extends K ? never : P] : T[P]
// } 

// type PartialByKeys<T, K > =  {
//   [P in keyof T as P extends K ? never : P]? : T[P]
// }

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

interface User {
  name: string
  age: number
  address: string
}

interface UserPartialName {
  name?: string |undefined
  age: number
  address: string
}

interface UserPartialNameAndAge {
  name?: string
  age?: number
  address: string
}

type test = PartialByKeys<User>
type cases = [
  Expect<Equal<PartialByKeys<User, 'name'>, UserPartialName>>,
  Expect<Equal<PartialByKeys<User, 'name' | 'unknown'>, UserPartialName>>,
  Expect<Equal<PartialByKeys<User, 'name' | 'age'>, UserPartialNameAndAge>>,
  Expect<Equal<PartialByKeys<User>, Partial<User>>>,
]

type test2 = Partial<User>


/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/2757/answer
  > View solutions: https://tsch.js.org/2757/solutions
  > More Challenges: https://tsch.js.org
*/



interface Person{
	name:string;
}
interface Lifespan{
	birth:Date;
	death?: Date;
}
type PersonSpan = Person & Lifespan;

const a :PersonSpan = {
  birth:new Date(),
  name:"123",
}
console.log()