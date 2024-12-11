import { expect } from "@infra-blocks/test";
import { isFunction, isNumber, isString, isSymbol } from "../../src/index.js";

describe("guard", function () {
  /* eslint-enable @typescript-eslint/no-unused-vars */
  describe("isString", function () {
    it("should return false for undefined", function () {
      expect(isString(undefined)).to.be.false;
    });
    it("should return false for null", function () {
      expect(isString(null)).to.be.false;
    });
    it("should return false for non string value", function () {
      expect(isString(4)).to.be.false;
    });
    it("should return true for string value", function () {
      expect(isString("I am a string")).to.be.true;
    });
    it("should return true with falsy string value", function () {
      expect(isString("")).to.be.true;
    });
  });
  describe("isSymbol", function () {
    it("should return false for undefined", function () {
      expect(isSymbol(undefined)).to.be.false;
    });
    it("should return false for null", function () {
      expect(isSymbol(null)).to.be.false;
    });
    it("should return false for non symbol value", function () {
      expect(isSymbol("toto")).to.be.false;
    });
    it("should return true for symbol value", function () {
      expect(isSymbol(Symbol("toto"))).to.be.true;
    });
  });
  describe("isNumber", function () {
    it("should return false for undefined", function () {
      expect(isNumber(undefined)).to.be.false;
    });
    it("should return false for null", function () {
      expect(isNumber(null)).to.be.false;
    });
    it("should return false for non number value", function () {
      expect(isNumber("42")).to.be.false;
    });
    it("should return true for number value", function () {
      expect(isNumber(42)).to.be.true;
    });
  });
  describe("isFunction", function () {
    it("should return false for undefined", function () {
      expect(isFunction(undefined)).to.be.false;
    });
    it("should return false for null", function () {
      expect(isFunction(null)).to.be.false;
    });
    it("should return false for a non function value", function () {
      expect(isFunction("function")).to.be.false;
    });
    it("should return true for a lambda", function () {
      expect(isFunction(() => 5)).to.be.true;
    });
    it("should return true for a named function", function () {
      function theFunk(): string {
        return "funk";
      }
      expect(isFunction(theFunk)).to.be.true;
    });
    it("should return true for an object method", function () {
      class Toto {
        sayWhat(): string {
          return "what";
        }
      }

      const instance = new Toto();
      expect(isFunction(instance.sayWhat.bind(instance))).to.be.true;
    });
  });
});
