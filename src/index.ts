import { fail } from "node:assert";

export * from "./func.js";
export * from "./guard.js";
export * from "./predicates.js";
export * from "./types.js";

// TODO: Message type, that is either: undefined, a string, a string followed by format args or a function returning a string.
/**
 * A function for forcing exhaustiveness in switch statements or if-else chains.
 *
 * Throws an assertion error at runtime if called. The message can be specified as the second argument.
 *
 * @example
 * type BigType = "penus" | "penii";
 * function doStuff(x: BigType) {
 *  switch (x) {
 *    case "penus":
 *      // Do some sheet.
 *      break;
 *    case "penii":
 *      // Do some other sheet.
 *      break;
 *    default:
 *      unreachable(x); // This will not compile if the switch is not exhaustive.
 *  }
 * }
 * doStuff("penus");
 *
 * @param value - The value to validate against never.
 */
export function unreachable(_: never, message?: string): never {
  fail(message ?? "unreachable code reached!");
}

/**
 * A function to mark a value as trusted for a type cast that can leverage inference.
 *
 * It is 100% the same as doing a type cast. Sometimes it's going to look nicer and
 * look more compact, sometimes you're better off with writing the cast.
 *
 * @example
 * type BullshitType = {
 *  contentz?: string;
 * };
 * const value: BullshitType = {
 *  contentz: "toto",
 * };
 * const content: string = trusted(value.contentz);
 * content.toUpperCase();
 *
 * @param value - The value to type cast.
 *
 * @returns The value, casted as the parametric type.
 */
export function trusted<T>(value: unknown): T {
  return value as T;
}
