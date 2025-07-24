import { expect } from "@infra-blocks/test";
import { isPlainObject } from "../../src/predicates.js";

describe("predicates", () => {
  describe(isPlainObject.name, function () {
    it("should return false for undefined", function () {
      expect(isPlainObject(undefined)).to.be.false;
    });
    it("should return false for null", function () {
      expect(isPlainObject(null)).to.be.false;
    });
    it("should return false for a number", function () {
      expect(isPlainObject(42)).to.be.false;
    });
    it("should return false for a bigint", function () {
      expect(isPlainObject(42n)).to.be.false;
    });
    it("should return false for a string", function () {
      expect(isPlainObject("test")).to.be.false;
    });
    it("should return false for a boolean", function () {
      expect(isPlainObject(true)).to.be.false;
    });
    it("should return false for a symbol", function () {
      expect(isPlainObject(Symbol("test"))).to.be.false;
    });
    it("should return false for an array", function () {
      expect(isPlainObject([1, 2, 3])).to.be.false;
    });
    it("should return false for a custom class instance", function () {
      class CustomClass {}
      expect(isPlainObject(new CustomClass())).to.be.false;
    });
    it("should return true for an object literal", function () {
      expect(isPlainObject({})).to.be.true;
    });
    it("should return true for an object created with Object constructor", function () {
      expect(isPlainObject(new Object())).to.be.true;
    });
  });
});
