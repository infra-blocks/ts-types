import { expect } from "@infra-blocks/test";
import {
  EnvironmentVariables,
  isString,
  KeyOfType,
  TransitivePartial,
  UnpackedArray,
  UnpackedPromise,
} from "../../src/index.js";

describe("types", function () {
  describe("EnvVars", function () {
    // The tests here just showcase the good use cases when it compiles.
    it("should work for process.env", function () {
      const env: EnvironmentVariables = process.env;
      expect(env).to.be.an("object");
    });
  });
  describe("UnpackedArray", function () {
    // The tests here just showcase the good use cases when it compiles.
    it("should work for an array of string", function () {
      const array = ["one", "two", "three"];
      const myStuff: UnpackedArray<typeof array> = "four";
      expect(isString(myStuff)).to.be.true;
    });
  });
  describe("UnpackedPromise", function () {
    it("should work with a promise resolving in a string", function () {
      const promise = Promise.resolve("one");
      const myStuff: UnpackedPromise<typeof promise> = "two";
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
    });
  });
});
