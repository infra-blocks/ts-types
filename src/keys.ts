/**
 * A convenience type mapping to extract keys of a type that extend a given type.
 *
 * For example, if you would like all the types of an object that are numbers, you could do
 * `KeysOfType<TheType, number>`.
 *
 * @see https://github.com/microsoft/TypeScript/issues/34992
 */

export type ExtendingKeys<T, U> = keyof {
  [P in keyof T as T[P] extends U ? P : never]: P;
};

/**
 * A mapped type remapping all keys of K to type V.
 */
export type MapKeys<K, V> = {
  [k in keyof K]: V;
};

/**
 * A type utility useful to constrain types to have the same keys as M, without imposing
 * restrictions on the value.
 *
 * It's an alias for MapKeys<M, unknown>.
 */
// TODO: write a good minimal test for this type.
export type SameKeys<M> = MapKeys<M, unknown>;
