/* eslint-disable */

/// optional chaining and nullish coalescing

let x: {
  name: string;
  user: {
    address?: {
      street: string;
      city: string;
    };
  };
} = undefined as any;

console.log(x.user.address?.city);

class Foo {
  //@ts-ignore
  #name;
  constructor(name?: string) {
    this.#name = name ?? '(no name)';
  }
}

/// tuple types

/// variadic tuple types
type Bar<T extends any[]> = [boolean, ...T, boolean];

/// labels
type Address = [
  streetNumber: number,
  city: string,
  state: string,
  postal: number,
];
//@ts-ignore
function printAddress(...address: Address) {}

// @ts-expect-error
const num1: number = true;

// @ts-ignore
const num2: number = true;

// type guard
function isError(err: any): err is Error {
  return err instanceof Error;
}

// can assert in tests (not in app code)
function assertIsError(err: any): asserts err is Error {
  if (isError(err)) throw new Error(`Not an error: ${err}`);
}

// typing try/catch
function somethingRisky() {}
try {
  somethingRisky();
} catch (err: unknown) {
  if (isError(err)) {
    console.log(err.stack);
  } else {
    console.log(err);
  }
}
