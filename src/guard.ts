/**
 * A type guard to assess that a value is an object and not null.
 *
 * This function exists because {@link isObject} will return `true` for `null`.
 * This is because `typeof null === "object"`. This function validates
 * that `typeof value === "object" && value !== null`.
 *
 * @param value - The value to test.
 *
 * @returns Whether or not the value is an object and not null.
 *
 * @see isObject
 */
export function isObjectNotNull(value: unknown): value is object {
  return typeof value === "object" && value !== null;
}
