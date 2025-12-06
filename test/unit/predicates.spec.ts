import { expect } from "@infra-blocks/test";
import { isPlainObject } from "../../src/predicates.js";

describe("predicates", () => {
  describe(isPlainObject.name, () => {
    it("should return false for undefined", () => {
      expect(isPlainObject(undefined)).to.be.false;
    });
    it("should return false for null", () => {
      expect(isPlainObject(null)).to.be.false;
    });
    it("should return false for a number", () => {
      expect(isPlainObject(42)).to.be.false;
    });
    it("should return false for a bigint", () => {
      expect(isPlainObject(42n)).to.be.false;
    });
    it("should return false for a string", () => {
      expect(isPlainObject("test")).to.be.false;
    });
    it("should return false for a boolean", () => {
      expect(isPlainObject(true)).to.be.false;
    });
    it("should return false for a symbol", () => {
      expect(isPlainObject(Symbol("test"))).to.be.false;
    });
    it("should return false for an array", () => {
      expect(isPlainObject([1, 2, 3])).to.be.false;
    });
    it("should return false for a custom class instance", () => {
      class CustomClass {}
      expect(isPlainObject(new CustomClass())).to.be.false;
    });
    it("should return true for an object literal", () => {
      expect(isPlainObject({})).to.be.true;
    });
    it("should return true for an object created with Object constructor", () => {
      expect(isPlainObject(new Object())).to.be.true;
    });
  });
});
