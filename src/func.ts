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
 * A type alias for single element predicate functions.
 */
export type Predicate<T> = (item: T) => boolean;

/**
 * A type alias for functions that return a value of a given type without arguments.
 */
export type Provider<T> = () => T;

/**
 * A type alias for asynchronous provider functions.
 */
export type AsyncProvider<T> = () => Promise<T>;

/**
 * A convenient type declaration for handlers used to resolve "error" type events.
 */
export type ErrorHandler<T extends Error = Error> = (err: T) => void;
