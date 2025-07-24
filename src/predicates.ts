/**
 * A type predicate to determine if a value is a plain object.
 *
 * A plain object is created either with the object literal syntax or with the Object constructor.
 * Any other type of object will not satisfy this predicate.
 *
 * @param value - The value to test.
 *
 * @returns Whether or not the value is a plain object.
 */
export function isPlainObject(value: unknown): boolean {
  return (
    typeof value === "object" && value !== null && value.constructor === Object
  );
}
