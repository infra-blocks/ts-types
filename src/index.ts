export * from "./func.js";
export * from "./guard.js";
export * from "./events.js";
export * from "./predicates.js";
export * from "./types.js";

/**
 * A function for forcing exhaustiveness in switch statements or if-else chains.
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
export function unreachable(value: never): never {
  return value;
}
