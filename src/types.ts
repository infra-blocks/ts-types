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
export type Brand<
  T extends string | number | symbol = string | number | symbol,
> = {
  [brand]: { [k in T]: true };
};

/**
 * Convenience type to represent environment variables.
 */
export type EnvironmentVariables = Record<string, string | undefined>;
/**
 * Just aliasing {@link EnvironmentVariables} for brevity.
 */
export type EnvVars = EnvironmentVariables;

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
 * A mapped type remapping all keys of K to type V.
 */
export type MapKeys<K, V> = {
  [k in keyof K]: V;
};

/**
 * Convenient type alias to regroup a type that can be T, null or undefined.
 *
 * Semantically the opposite of {@link NonNullable}.
 */
export type Nullable<T> = T | null | undefined;

/**
 * Convenient mapped type to selectively make some fields of a type optional.
 *
 * This is in contrast to the built-in `Partial` type which makes all fields optional.
 */
export type Optional<T, K extends keyof T = keyof T> = Partial<Pick<T, K>> &
  Omit<T, K>;

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
 * A type utility useful to constrain types to have the same keys as M, without imposing
 * restrictions on the value.
 *
 * It's an alias for MapKeys<M, unknown>.
 */
// TODO: write a good minimal test for this type.
export type SameKeys<M> = MapKeys<M, unknown>;

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
