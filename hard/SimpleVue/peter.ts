import type { Equal, Expect } from '@type-challenges/utils';

/* _____________ Your Code Here _____________ */
type ToComputed<ComputedMethods> = ComputedMethods extends Record<string, () => any>
  ? {
    [key in keyof ComputedMethods]: ReturnType<ComputedMethods[key]>;
  }
  : {};

type Option<Data, Computed, Methods> = {
  data: () => Data;
  computed: Computed & ThisType<Data & Methods>;
  methods: Methods & ThisType<Data & ToComputed<Computed> & Methods>;
} & ThisType<never>;

declare function SimpleVue<
  Data,
  Computed,
  Methods
  // Methods extends { [key: string]: (this: Data & ToComputed<Computed>) => unknown }
>(options: Option<Data, Computed, Methods>): Data & ToComputed<Computed> & Methods;

/* _____________ Test Cases _____________ */

SimpleVue({
  data() {
    // @ts-expect-error
    this.firstname;
    // @ts-expect-error
    this.getRandom();
    // @ts-expect-error
    this.data();

    return {
      firstname: 'Type',
      lastname: 'Challenges',
      amount: 10,
    };
  },
  computed: {
    fullname() {
      return `${this.firstname} ${this.lastname}`;
    },
  },
  methods: {
    getRandom() {
      return Math.random();
    },
    hi() {
      alert(this.amount);
      alert(this.fullname.toLowerCase());
      alert(this.getRandom());
    },
    test() {
      const { fullname } = this;
      const cases: [Expect<Equal<typeof fullname, string>>] = [] as any;
    },
  },
});

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/6/answer
  > View solutions: https://tsch.js.org/6/solutions
  > More Challenges: https://tsch.js.org
*/
