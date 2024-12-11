import { expect } from "@infra-blocks/test";
import {
  isString,
  KeysOfType,
  TransitivePartial,
  UnpackedArray,
  UnpackedPromise,
} from "../../src/index.js";

describe("types", function () {
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
});
