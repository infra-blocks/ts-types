import { expect } from "@infra-blocks/test";
import {
  type EnvironmentVariables,
  isString,
  type KeyOfType,
  type MapKeys,
  type Optional,
  type Primitive,
  type TransitivePartial,
  type UnpackedArray,
} from "../../src/index.js";

describe("types", () => {
  describe("EnvVars", () => {
    it("should work for process.env", () => {
      const env: EnvironmentVariables = process.env;
      expect(env).to.be.an("object");
    });
  });
  describe("KeyOfType", () => {
    interface TestType {
      firstName: string;
      lastName: string;
      x: number;
      y: number;
      z: number;
      getAge: () => number;
      getStuff: () => string;
    }

    it("should compile with keys of type number", () => {
      const func = (arg: KeyOfType<TestType, number>): string => arg;
      // Those are the only values for which it compiles.
      func("x");
      func("y");
      func("z");
      // @ts-expect-error firstName is not a number.
      func("firstName");
      // @ts-expect-error lastName is not a number.
      func("lastName");
      // @ts-expect-error getAge is not a number.
      func("getAge");
      // @ts-expect-error getStuff is not a number.
      func("getStuff");
    });
  });
  describe("MapKeys", () => {
    interface TestType {
      firstName: string;
      lastName: string;
      x: number;
      y: number;
      z: number;
      getAge: () => number;
      getStuff: () => string;
    }

    it("should remap all keys", () => {
      type MappedType = MapKeys<TestType, Date>;
      // Any key returns a date.
      const _func = <K extends keyof MappedType>(m: MappedType, k: K): Date =>
        m[k];
    });
  });
  describe("Optional", () => {
    interface MyType {
      one: number;
      two: string;
      three: boolean;
    }

    it("should work with subset of fields", () => {
      const myStuff: Optional<MyType, "one" | "two"> = {
        one: 1,
        three: true,
      };
      // @ts-expect-error one can be undefined.
      const _one: number = myStuff.one;
      // @ts-expect-error two can be undefined.
      const _two: string = myStuff.two;
      // This is fine because three is not optional.
      const _three: boolean = myStuff.three;
    });
    it("should not compile with a field that is not a key", () => {
      // @ts-expect-error four is not a key of MyType.
      const _myStuff: Optional<MyType, "four"> = {
        one: 1,
        two: "two",
        three: true,
      };
    });
  });
  describe("Primitive", () => {
    function canYouEven(_: Primitive): void {
      // Do nothing.
    }

    it("should not compile with an object", () => {
      // @ts-expect-error object is not a Primitive.
      canYouEven({});
    });
    it("should not compile with an array", () => {
      // @ts-expect-error array is not a Primitive.
      canYouEven([]);
    });
    it("should compile with bigint", () => {
      canYouEven(42n);
    });
    it("should compile with boolean", () => {
      canYouEven(true);
    });
    it("should compile with null", () => {
      canYouEven(null);
    });
    it("should compile with number", () => {
      canYouEven(42);
    });
    it("should compile with string", () => {
      canYouEven("hello");
    });
    it("should compile with symbol", () => {
      canYouEven(Symbol("test"));
    });
    it("should compile with undefined", () => {
      canYouEven(undefined);
    });
  });
  describe("TransitivePartial", () => {
    it("should compile with nested partial objects", () => {
      const myType = {
        one: 1,
        two: 2,
        three: {
          threeOne: "threeOne",
          threeTwo: "threeTwo",
        },
      };
      const func = (_x: TransitivePartial<typeof myType>): number => 0;
      // Works with empty object.
      func({});
      // Notice how we don't have to provide the second field of the nested object.
      func({ three: { threeOne: "toto" } });
    });
  });
  describe("UnpackedArray", () => {
    it("should work for an array of string", () => {
      const array = ["one", "two", "three"];
      const myStuff: UnpackedArray<typeof array> = "four";
      isString(myStuff);
    });
  });
});
