/**
 * Convenient type to easily represent "callable" types and to avoid using
 * "any" in client code.
 */
export type Callable = (...args: never[]) => unknown;
/**
 * Convenient type alias for constructors.
 */
/*
 We use "any" here because this is actually a requirement on mixins at the time of this writing. Meaning,
 mixins *must* have a constructor with a single rest argument of any[]. So we thought that'd be a good default.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Constructor<R = object, A extends any[] = any[]> = new (
  ...args: A
) => R;
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
