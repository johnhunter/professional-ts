export function assertIsTypedArray<T>(
  arg: any,
  check: (val: any) => val is T,
): asserts arg is T[] {
  if (!Array.isArray(arg)) {
    throw new Error(`Not an array: ${JSON.stringify(arg)}`);
  }
  if (arg.some((item) => !check(item))) {
    throw new Error(`Violators found: ${JSON.stringify(arg)}`);
  }
}
