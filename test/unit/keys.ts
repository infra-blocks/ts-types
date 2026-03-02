import { suite, test } from "node:test";
import { expectTypeOf } from "@infra-blocks/test";
import type {
  ExtendingKeys,
  MapKeys,
  OptionalKeys,
  RequiredKeys,
} from "../../src/index.js";

export const keysTests = () => {
  suite("keys", () => {
    suite("ExtendingKeys", () => {
      interface Test {
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
        expectTypeOf<ExtendingKeys<Test, number>>().toEqualTypeOf<"x">();
      });

      test("should work with keys of type string | undefined", () => {
        expectTypeOf<ExtendingKeys<Test, string | undefined>>().toEqualTypeOf<
          "firstName" | "middleName" | "lastName" | "undefined"
        >();
      });

      test("should work with keys of type number | string", () => {
        expectTypeOf<ExtendingKeys<Test, string | number>>().toEqualTypeOf<
          "firstName" | "x" | "z"
        >();
      });
    });
  });

  suite("MapKeys", () => {
    interface Test {
      firstName: string;
      lastName: string;
      x: number;
      y: number;
      z: number;
      getAge: () => number;
      getStuff: () => string;
    }

    test("should remap all keys", () => {
      type MappedType = MapKeys<Test, Date>;
      // Any key returns a date.
      const _func = <K extends keyof MappedType>(m: MappedType, k: K): Date =>
        m[k];
    });
  });

  suite("OptionalKeys", () => {
    test("should resolve to never on empty type", () => {
      const x = {};
      expectTypeOf<OptionalKeys<typeof x>>().toBeNever();
    });

    test("should resolve to never when no optional keys are present", () => {
      expectTypeOf<OptionalKeys<{ x: number }>>().toBeNever();
    });

    test("should not include required keys whose type includes undefined", () => {
      expectTypeOf<
        OptionalKeys<{ x: undefined; y: number | undefined }>
      >().toBeNever();
    });

    test("should include optional keys only", () => {
      expectTypeOf<
        OptionalKeys<{ x?: string; y?: string; z: string | undefined }>
      >().toEqualTypeOf<"x" | "y">();
    });

    test("should resolve to key type on record type", () => {
      expectTypeOf<
        OptionalKeys<Record<PropertyKey, unknown>>
      >().toEqualTypeOf<PropertyKey>();
    });
  });

  suite("RequiredKeys", () => {
    test("should resolve to never on empty type", () => {
      const x = {};
      expectTypeOf<RequiredKeys<typeof x>>().toBeNever();
    });

    test("should resolve to never on record type", () => {
      expectTypeOf<RequiredKeys<Record<PropertyKey, unknown>>>().toBeNever();
    });

    test("should resolve to never when no required keys are present", () => {
      expectTypeOf<RequiredKeys<{ x?: number }>>().toBeNever();
    });

    test("should include keys whose type includes undefined", () => {
      expectTypeOf<
        RequiredKeys<{ x: undefined; y: number | undefined }>
      >().toEqualTypeOf<"x" | "y">();
    });

    test("should include required keys only", () => {
      expectTypeOf<
        RequiredKeys<{ x?: string; y?: string; z: string | undefined }>
      >().toEqualTypeOf<"z">();
    });
  });
};
