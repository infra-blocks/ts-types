import { expect } from "@infra-blocks/test";
import {
  EnvironmentVariables,
  isString,
  KeyOfType,
  Optional,
  TransitivePartial,
  UnpackedArray,
} from "../../src/index.js";

describe("types", function () {
  describe("EnvVars", function () {
    it("should work for process.env", function () {
      const env: EnvironmentVariables = process.env;
      expect(env).to.be.an("object");
    });
  });
  describe("KeyOfType", function () {
    interface TestType {
      firstName: string;
      lastName: string;
      x: number;
      y: number;
      z: number;
      getAge: () => number;
      getStuff: () => string;
    }

    it("should compile with keys of type number", function () {
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
  describe("Optional", function () {
    interface MyType {
      one: number;
      two: string;
      three: boolean;
    }

    it("should work with subset of fields", function () {
      const myStuff: Optional<MyType, "one" | "two"> = {
        one: 1,
        three: true,
      };
      // @ts-expect-error one can be undefined.
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const one: number = myStuff.one;
      // @ts-expect-error two can be undefined.
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const two: string = myStuff.two;
      // This is fine because three is not optional.
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const three: boolean = myStuff.three;
    });
    it("should not compile with a field that is not a key", function () {
      // @ts-expect-error four is not a key of MyType.
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const myStuff: Optional<MyType, "four"> = {
        one: 1,
        two: "two",
        three: true,
      };
    });
  });
  describe("UnpackedArray", function () {
    it("should work for an array of string", function () {
      const array = ["one", "two", "three"];
      const myStuff: UnpackedArray<typeof array> = "four";
      expect(isString(myStuff)).to.be.true;
    });
  });
  describe("TransitivePartial", function () {
    it("should compile with nested partial objects", function () {
      const myType = {
        one: 1,
        two: 2,
        three: {
          threeOne: "threeOne",
          threeTwo: "threeTwo",
        },
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const func = (x: TransitivePartial<typeof myType>): number => 0;
      // Works with empty object.
      func({});
      // Notice how we don't have to provide the second field of the nested object.
      func({ three: { threeOne: "toto" } });
    });
  });
});
