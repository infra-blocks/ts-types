import { Constructor } from "./types.js";

function applyMixins(derived: Constructor, bases: Constructor[]) {
  bases.forEach((base) => {
    Object.getOwnPropertyNames(base.prototype).forEach((name) => {
      Object.defineProperty(
        derived.prototype,
        name,
        Object.getOwnPropertyDescriptor(base.prototype, name) ||
          Object.create(null)
      );
    });
  });
}
