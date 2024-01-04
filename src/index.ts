/**
 * Convenient type alias to regroup a type that can be T, null or undefined.
 *
 * Semantically the opposite of {@link NonNullable}.
 */
export type Nullable<T> = T | null | undefined;

/**
 * A type alias for single element predicate functions.
 */
export type Predicate<T> = (item: T) => boolean;

/**
 * A type alias for functions that return a value of a given type without arguments.
 */
export type Provider<T> = () => T;

/**
 * A convenient type declaration for handlers used to resolve "error" type events.
 */
export type ErrorHandler<T extends Error = Error> = (err: T) => void;

/**
 * A convenience type extractor to get the inner type of an array.
 *
 * It will cause compilation errors if T isn't an array.
 *
 * See here: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html
 */
export type UnpackedArray<T> = T extends (infer U)[] ? U : never;

/**
 * A convenience type extractor to get the inner type of a promise.
 *
 * It will cause compilation errors if T isn't a promise.
 *
 * See here: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html
 */
export type UnpackedPromise<T> = T extends Promise<infer U> ? U : never;

/**
 * A convenience type mapping that transitively make partial fields optional.
 *
 * The built-in Partial type doesn't cover nested objects, this one does.
 */
export type TransitivePartial<T> = {
  [K in keyof T]?: T[K] extends object ? TransitivePartial<T[K]> : T[K];
};

/**
 * A convenience type mapping to extract keys of a type that are of a given type.
 *
 * For example, if you would like all the types of an object that are numbers, you could do
 * KeyOfType<TheType, number>
 */
export type KeyOfType<T, U> = {
  [P in keyof T]: T[P] extends U ? P : never;
}[keyof T];

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
