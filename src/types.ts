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
