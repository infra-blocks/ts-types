/**
 * A convenience type to constrain generics on types and interfaces.
 */
// biome-ignore lint/suspicious/noExplicitAny: Record<K, any> is compatible with interface types, whereas Record<K, unknown> isn't.
export type AnyRecord<K extends PropertyKey = PropertyKey> = Record<K, any>;

/**
 * The unique symbol used for branding types.
 */
export const brand: unique symbol = Symbol("__brand");

/**
 * Declares the branding of a type.
 *
 * Branding a type circumvent TypeScript's structural typing by adding an unique property to a type,
 * making it incompatible with other types even if they share the same structure.
 *
 * Use it as such:
 * ```typescript
 * type UserId = string & Brand<"UserId">;
 *
 * // The proper way to obtain a UserId.
 * function parseUserId(id: string): UserId {
 *  ...
 * }
 * ```
 */
export type Brand<T extends PropertyKey = PropertyKey> = {
  [brand]: { [k in T]: true };
};

/**
 * Excludes `undefined` from `T`.
 */
export type Defined<T> = Exclude<T, undefined>;

/**
 * Convenience type to represent environment variables.
 */
export type EnvironmentVariables = Record<string, string | undefined>;
/**
 * Just aliasing {@link EnvironmentVariables} for brevity.
 */
export type EnvVars = EnvironmentVariables;

/**
 * A type representing nil types, also known as "nullable" types in Typescript
 * utility types terminology.
 */
export type Nil = null | undefined;

/**
 * Convenient type alias to regroup a type that can be T, null or undefined.
 *
 * Semantically the opposite of {@link NonNullable}.
 */
export type Nullable<T> = T | null | undefined;

/**
 * A utility type for tracking a phantom type parameter.
 */
export type Phantom<T> = { _phantom?: T };

/**
 * A union type that includes all primitive types.
 */
export type Primitive =
  | bigint
  | boolean
  | null
  | number
  | string
  | symbol
  | undefined;

/**
 * A type representing all types that can be used in a vanilla template literal.
 *
 * It includes all primitive types except symbols, which throw a {@link TypeError} when
 * used directly in a template literal. It also includes objects, which will use
 * various possible implementations. The default one is rather useless, however,
 * as it only produces the string "[object Object]".
 *
 * See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#string_coercion
 */
export type TemplateExpression = Exclude<Primitive, symbol> | object;

/**
 * A convenience type mapping that transitively make partial fields optional.
 *
 * The built-in Partial type doesn't cover nested objects, this one does.
 */
export type TransitivePartial<T> = {
  [K in keyof T]?: T[K] extends object ? TransitivePartial<T[K]> : T[K];
};

/**
 * A convenience type extractor to get the inner type of an array.
 *
 * It will cause compilation errors if T isn't an array.
 *
 * See here: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html
 */
export type UnpackedArray<T> = T extends (infer U)[] ? U : never;

/**
 * Returns a type where fields have selectively been made partial.
 */
export type WithPartial<T, K extends keyof T> = Omit<T, K> & {
  [P in K]?: T[P];
};

/**
 * Returns a type where fields have selectively been made required.
 */
export type WithRequired<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: T[P];
};
