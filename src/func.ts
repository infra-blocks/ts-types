/**
 * The abstract version of {@link Constructor}.
 *
 * Useful when the constructor is never called directly (such as when used with an `instanceof` operator).
 */
export type AbstractConstructor<
  R = object,
  /*
  We use "any" here because this is actually a requirement on mixins at the time of this writing. Meaning,
  mixins *must* have a constructor with a single rest argument of any[]. So we thought that'd be a good default.
  */
  // biome-ignore lint/suspicious/noExplicitAny: any is the only correct type here.
  A extends any[] = any[],
> = abstract new (...args: A) => R;

/**
 * The async flavor of {@link Factory}.
 */
// biome-ignore lint/suspicious/noExplicitAny: see Factory
export type AsyncFactory<R, P extends any[] = any[]> = Factory<Promise<R>, P>;

/**
 * The async flavor of {@link Parser}.
 */
export type AsyncParser<Output, Input = unknown> = (
  input: Input,
) => Promise<Output>;

/**
 * The async flavor of {@link Predicate}.
 */
export type AsyncPredicate<T> = (item: T) => Promise<boolean>;

/**
 * The async flavor of {@link Provider}.
 */
export type AsyncProvider<T> = () => Promise<T>;

/**
 * The async flavor of {@link Transform}.
 */
export type AsyncTransform<I, O> = (input: I) => Promise<O>;

/**
 * Convenient type to easily represent any "callable" types and to avoid using
 * "any" in client code.
 */
export type Callable = (...args: never[]) => unknown;

/**
 * Convenient type alias for *callable* constructors (excluding abstract ones).
 */
// biome-ignore lint/suspicious/noExplicitAny: any is the only correct type here.
export type Constructor<R = object, A extends any[] = any[]> = new (
  ...args: A
) => R;

/**
 * A convenient type declaration for handlers used to resolve "error" type events.
 */
export type ErrorHandler<T = unknown> = (err: T) => void;

/**
 * A type alias for a function that creates objects of a given type.
 */
/*
biome-ignore lint/suspicious/noExplicitAny: any allows every function that returns T to extend Factory<T>.
This isn't true for unknown[], for example.
*/
export type Factory<R, P extends any[] = any[]> = (...params: P) => R;

/**
 * A type alias for parser functions.
 *
 * The input of parser functions defaults to `unknown`, but can be specified.
 * Parsers are functions that take loosely typed input and return a stricter version,
 * often performing validation in the process. Parsers should be expected to throw
 * errors on validation failures.
 */
export type Parser<O, I = unknown> = Transform<I, O>;

/**
 * A type alias for single element predicate functions.
 */
export type Predicate<T> = (item: T) => boolean;

/**
 * A type alias for functions that return a value of a given type without arguments.
 */
export type Provider<T> = () => T;

/**
 * A type alias for transformation functions.
 *
 * A transform takes a value of type I and returns a value of type O. Unlike {@link Parser},
 * transforms are typically not expected to perform validation and therefore aren't
 * expected to throw errors.
 */
export type Transform<I, O> = (input: I) => O;

/**
 * A type alias for type guards.
 */
export type TypeGuard<T extends V, V = unknown> = (value: V) => value is T;
