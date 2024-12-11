import { KeysOfType } from "../../src/keys.js";

/* eslint-disable @typescript-eslint/no-unused-vars */
describe("keys", function () {
  interface TestType {
    stringKey: string;
    optionalStringKey?: string;
    numberKey: number;
    optionalNumberKey?: number;
    functionKey: () => number;
    optionalFunctionKey?: () => string;
  }

  describe("KeysOfType", function () {
    it("should work with number", function () {
      type TestKeys = KeysOfType<TestType, number>;

      let key: TestKeys = "numberKey";
      // @ts-expect-error optionalNumberKey is not a valid key.
      key = "optionalNumberKey";
      // @ts-expect-error x is not a valid key.
      key = "stringKey";
      // @ts-expect-error y is not a valid key.
      key = "optionalStringKey";
      // @ts-expect-error getAge is not a valid key.
      key = "functionKey";
      // @ts-expect-error getStuff is not a valid key.
      key = "optionalFunctionKey";
    });
    it("should work in conjunction with Required", function () {
      type TestKeys = KeysOfType<Required<TestType>, number>;

      let key: TestKeys = "numberKey";
      key = "optionalNumberKey";
      // @ts-expect-error x is not a valid key.
      key = "stringKey";
      // @ts-expect-error y is not a valid key.
      key = "optionalStringKey";
      // @ts-expect-error getAge is not a valid key.
      key = "functionKey";
      // @ts-expect-error getStuff is not a valid key.
      key = "optionalFunctionKey";
    });
    it("should work with intersection type to extract specific undefined keys", function () {
      type TestKeys = KeysOfType<TestType, number | undefined> &
        KeysOfType<TestType, number>;

      let key: TestKeys = "optionalNumberKey";
      // @ts-expect-error numberKey is not a valid key.
      key = "numberKey";
      // @ts-expect-error x is not a valid key.
      key = "stringKey";
      // @ts-expect-error y is not a valid key.
      key = "optionalStringKey";
      // @ts-expect-error getAge is not a valid key.
      key = "functionKey";
      // @ts-expect-error getStuff is not a valid key.
      key = "optionalFunctionKey";
    });
  });
  describe("NumberKeys", function () {});
});
