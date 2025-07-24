import { Primitive } from "./types.js";

/**
 * A type guard to assess that a value is a bigint.
 *
 * This function uses the `typeof` operator's definition of a bigint.
 *
 * @param value - The value to test.
 *
 * @returns Whether or not the value is a bigint.
 *
 * @see https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards
 */
export function isBigint(value: unknown): value is bigint {
  return typeof value === "bigint";
}

/**
 * A type guard to assess that a value is a boolean.
 *
 * This function uses the `typeof` operator's definition of a boolean.
 *
 * @param value - The value to test.
 *
 * @returns Whether or not the value is a boolean.
 *
 * @see https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards
 */
export function isBoolean(value: unknown): value is boolean {
  return typeof value === "boolean";
}

/**
 * A type guard to assess that a value is a function.
 *
 * This function uses the `typeof` operator's definition of a function.
 *
 * @param value - The value to test.
 *
 * @returns Whether or not the value is a function.
 *
 * @see https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function isFunction(value: unknown): value is Function {
  return typeof value === "function";
}

/**
 * A type guard to assess that a value is a number.
 *
 * This function uses the `typeof` operator's definition of a number.
 *
 * @param value - The value to test.
 *
 * @returns Whether or not the value is a number.
 *
 * @see https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards
 */
export function isNumber(value: unknown): value is number {
  return typeof value === "number";
}

/**
 * A type guard to assess that a value is null.
 *
 * This function uses the `===` operator to check for null.
 *
 * @param value - The value to test.
 *
 * @returns Whether or not the value is null.
 *
 * @see https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards
 */
export function isNull(value: unknown): value is null {
  return value === null;
}

/**
 * A type guard to assess that a value is an object.
 *
 * This function uses the `typeof` operator's definition of an object.
 * If you need to exclude null, you can use the {@link isObjectNotNull} function instead.
 *
 * @param value - The value to test.
 *
 * @returns Whether or not the value is an object.
 *
 * @see https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards
 */
export function isObject(value: unknown): value is object | null {
  return typeof value === "object";
}

/**
 * A type guard to assess that a value is an object and not null.
 *
 * This function uses {@link isObject} and {@link isNull} to determine if the value
 * is an object that is not null.
 *
 * @param value - The value to test.
 *
 * @returns Whether or not the value is an object and not null.
 *
 * @see isObject
 * @see https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards
 */
export function isObjectNotNull(value: unknown): value is object {
  return !isNull(value) && typeof value === "object";
}

/**
 * A type guard to assess that a value is a primitive.
 *
 * This function checks if the value is one of the primitive types:
 * bigint, boolean, null, number, string, symbol, or undefined.
 *
 * Sometimes those checks are made with the `typeof` operator, sometimes with strict equality checks.
 *
 * @param value - The value to test.
 *
 * @returns Whether or not the value is a primitive.
 *
 * @see isBigint
 * @see isBoolean
 * @see isNull
 * @see isNumber
 * @see isString
 * @see isSymbol
 * @see isUndefined
 * @see https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards
 */
export function isPrimitive(value: unknown): value is Primitive {
  return (
    isBigint(value) ||
    isBoolean(value) ||
    isNull(value) ||
    isNumber(value) ||
    isString(value) ||
    isSymbol(value) ||
    isUndefined(value)
  );
}

/**
 * A type guard to assess that a value is a string.
 *
 * This function uses the `typeof` operator's definition of a string.
 *
 * @param value - The value to test.
 *
 * @returns Whether or not the value is a string.
 *
 * @see https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards
 */
export function isString(value: unknown): value is string {
  return typeof value === "string";
}

/**
 * A type guard to assess that a value is a symbol.
 *
 * This function uses the `typeof` operator's definition of a symbol.
 *
 * @param value - The value to test.
 *
 * @returns Whether or not the value is a symbol.
 *
 * @see https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards
 */
export function isSymbol(value: unknown): value is symbol {
  return typeof value === "symbol";
}

/**
 * A type guard to assess that a value is undefined.
 *
 * This function uses the `typeof` operator's definition of undefined.
 *
 * @param value - The value to test.
 *
 * @returns Whether or not the value is undefined.
 *
 * @see https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards
 */
export function isUndefined(value: unknown): value is undefined {
  return typeof value === "undefined";
}
