import { suite, test } from "node:test";
import { expectTypeOf } from "@infra-blocks/test";
import type { ExtendingKeys, MapKeys } from "../../src/index.js";

export const keysTests = () => {
  suite("keys", () => {
    suite("KeysOfType", () => {
      interface TestType {
        firstName: string;
        middleName?: string;
        lastName?: string | undefined;
        x: number;
        y?: number;
        z: number | string;
        undefined: undefined;
        getAge: () => number;
        getStuff: () => string;
      }

      test("should work with keys of type number", () => {
        expectTypeOf<ExtendingKeys<TestType, number>>().toEqualTypeOf<"x">();
      });

      test("should work with keys of type string | undefined", () => {
        expectTypeOf<
          ExtendingKeys<TestType, string | undefined>
        >().toEqualTypeOf<
          "firstName" | "middleName" | "lastName" | "undefined"
        >();
      });

      test("should work with keys of type number | string", () => {
        expectTypeOf<ExtendingKeys<TestType, string | number>>().toEqualTypeOf<
          "firstName" | "x" | "z"
        >();
      });
    });
  });

  suite("MapKeys", () => {
    interface TestType {
      firstName: string;
      lastName: string;
      x: number;
      y: number;
      z: number;
      getAge: () => number;
      getStuff: () => string;
    }

    test("should remap all keys", () => {
      type MappedType = MapKeys<TestType, Date>;
      // Any key returns a date.
      const _func = <K extends keyof MappedType>(m: MappedType, k: K): Date =>
        m[k];
    });
  });
};
