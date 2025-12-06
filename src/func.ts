/**
 * The abstract version of {@link Constructor}.
 *
 * Useful when the constructor is never called directly (such as when used with an `instanceof` operator).
 */
export type AbstractConstructor<
  R = object,
  // biome-ignore lint/suspicious/noExplicitAny: any is the only correct type here.
  A extends any[] = any[],
> = abstract new (...args: A) => R;

/**
 * The async flavor of {@link Factory}.
 */
export type AsyncFactory<P extends unknown[], R> = (...params: P) => Promise<R>;

/**
 * A type alias for asynchronous provider functions.
 */
export type AsyncProvider<T> = () => Promise<T>;

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
// biome-ignore lint/suspicious/noExplicitAny: any is the only correct type here.
export type Constructor<R = object, A extends any[] = any[]> = new (
  ...args: A
) => R;

/**
 * A convenient type declaration for handlers used to resolve "error" type events.
 */
export type ErrorHandler<T extends Error = Error> = (err: T) => void;

/**
 * A type alias for a function that creates objects of a given type.
 */
export type Factory<P extends unknown[], R> = (...params: P) => R;

/**
 * A type alias for single element predicate functions.
 */
export type Predicate<T> = (item: T) => boolean;

/**
 * A type alias for functions that return a value of a given type without arguments.
 */
export type Provider<T> = () => T;

/**
 * A type alias for type guards.
 */
export type TypeGuard<T extends V, V = unknown> = (value: V) => value is T;
