/**
 * A convenience type mapping to extract keys of a type for which the value extends the provided type.
 *
 * For example, if you would like all the types of an object that are numbers, you could do
 * `KeyOfType<T, number>`. However, in this specific case, you could just use {@link NumberKeys} instead.
 *
 * It should be noted that no further type mapping is done. So, if a key is declared as such:
 * `field?: string;`, its effective type is `string | undefined`, not just string. So `KeysOfType<T, string>`
 * in this case wouldn't include `field`. One way to include optional keys this is to use it in conjunction with
 * {@link Required} like so: `KeysOfType<Required<T>, string>`.
 *
 * If what you mean to do is to get all the keys that are optional strings, then you would write
 * it like this: `KeysOfType<T, undefined> & KeysOfType<T, string>`, and *not* `KeysOfType<T, string | undefined>`.
 * The latter will also include any key that are of type `string`, `undefined`, or both.
 */
export type KeysOfType<T, U> = {
  [P in keyof T]: T[P] extends U ? P : never;
}[keyof T];
