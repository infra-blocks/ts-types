import { suite, test } from "node:test";
import { expect } from "@infra-blocks/test";
import { isObjectNotNull } from "../../src/index.js";

export const guardTests = () => {
  suite("guard", () => {
    suite(isObjectNotNull.name, () => {
      test("should return false for undefined", () => {
        expect(isObjectNotNull(undefined)).to.be.false;
      });

      test("should return false for null", () => {
        expect(isObjectNotNull(null)).to.be.false;
      });

      test("should return false for a string", () => {
        expect(isObjectNotNull("object")).to.be.false;
      });

      test("should return true for a record", () => {
        expect(isObjectNotNull({})).to.be.true;
      });

      test("should return true for an instance of a class", () => {
        class MyClass {}
        expect(isObjectNotNull(new MyClass())).to.be.true;
      });
    });
  });
};
