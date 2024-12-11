/**
 * A convenient Typescript type guard function to assess that a value is a string.
 *
 * @remark
 * This function is mostly meant as a Typescript type guard. See:
 * https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards
 *
 * @param value - The value to test.
 * @returns Whether or not the value is a string.
 */
export function isString(value: unknown): value is string {
  return typeof value === "string";
}

/**
 * A convenient Typescript type guard function to assess that a value is a symbol.
 *
 * @remark
 * This function is mostly meant as a Typescript type guard. See:
 * https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards
 *
 * @param value - The value to test.
 * @returns Whether or not the value is a symbol.
 */
export function isSymbol(value: unknown): value is symbol {
  return typeof value === "symbol";
}

/**
 * A convenient Typescript type guard function to assess that a value is a number.
 *
 * @remark
 * This function is mostly meant as a Typescript type guard. See:
 * https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards
 *
 * @param value - The value to test.
 * @returns Whether or not the value is a number.
 */
export function isNumber(value: unknown): value is number {
  return typeof value === "number";
}

/**
 * A convenient Typescript type guard function to assess that a value is a function.
 *
 * @remark
 * * This function is mostly meant as a Typescript type guard. See:
 * https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards
 *
 * @param value - The value to test.
 * @returns Whether or not the value is a function.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function isFunction(value: unknown): value is Function {
  return typeof value === "function";
}
