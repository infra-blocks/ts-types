import { expect } from "@infra-blocks/test";
import {
  isBigint,
  isBoolean,
  isFunction,
  isNull,
  isNumber,
  isObject,
  isObjectNotNull,
  isPrimitive,
  isString,
  isSymbol,
  isUndefined,
} from "../../src/index.js";

describe("guard", function () {
  describe(isBigint.name, function () {
    it("should return false for undefined", function () {
      expect(isBigint(undefined)).to.be.false;
    });
    it("should return false for null", function () {
      expect(isBigint(null)).to.be.false;
    });
    it("should return false for number", function () {
      expect(isBigint(42)).to.be.false;
    });
    it("should return true for bigint", function () {
      expect(isBigint(42n)).to.be.true;
    });
  });
  describe(isBoolean.name, function () {
    it("should return false for undefined", function () {
      expect(isBoolean(undefined)).to.be.false;
    });
    it("should return false for null", function () {
      expect(isBoolean(null)).to.be.false;
    });
    it("should return false for string", function () {
      expect(isBoolean("true")).to.be.false;
    });
    it("should return true for true", function () {
      expect(isBoolean(true)).to.be.true;
    });
    it("should return true for false", function () {
      expect(isBoolean(false)).to.be.true;
    });
  });
  describe(isFunction.name, function () {
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
  describe(isNumber.name, function () {
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
  describe(isNull.name, function () {
    it("should return false for undefined", function () {
      expect(isNull(undefined)).to.be.false;
    });
    it("should return true for null", function () {
      expect(isNull(null)).to.be.true;
    });
    it("should return false for string", function () {
      expect(isNull("null")).to.be.false;
    });
  });
  describe(isObject.name, function () {
    it("should return false for undefined", function () {
      expect(isObject(undefined)).to.be.false;
    });
    it("should return true for null", function () {
      expect(isObject(null)).to.be.true;
    });
    it("should return false for a string", function () {
      expect(isObject("object")).to.be.false;
    });
    it("should return true for a record", function () {
      expect(isObject({})).to.be.true;
    });
    it("should return true for an instance of a class", function () {
      class MyClass {}
      expect(isObject(new MyClass())).to.be.true;
    });
  });
  describe(isObjectNotNull.name, function () {
    it("should return false for undefined", function () {
      expect(isObjectNotNull(undefined)).to.be.false;
    });
    it("should return false for null", function () {
      expect(isObjectNotNull(null)).to.be.false;
    });
    it("should return false for a string", function () {
      expect(isObjectNotNull("object")).to.be.false;
    });
    it("should return true for a record", function () {
      expect(isObjectNotNull({})).to.be.true;
    });
    it("should return true for an instance of a class", function () {
      class MyClass {}
      expect(isObjectNotNull(new MyClass())).to.be.true;
    });
  });
  describe(isPrimitive.name, function () {
    it("should return false for an object", function () {
      expect(isPrimitive({})).to.be.false;
    });
    it("should return false for an array", function () {
      expect(isPrimitive([])).to.be.false;
    });
    it("should return true for a bigint", function () {
      expect(isPrimitive(42n)).to.be.true;
    });
    it("should return true for a boolean", function () {
      expect(isPrimitive(true)).to.be.true;
    });
    it("should return true for null", function () {
      expect(isPrimitive(null)).to.be.true;
    });
    it("should return true for a number", function () {
      expect(isPrimitive(42)).to.be.true;
    });
    it("should return true for a string", function () {
      expect(isPrimitive("I am a string")).to.be.true;
    });
    it("should return true for a symbol", function () {
      expect(isPrimitive(Symbol("toto"))).to.be.true;
    });
    it("should return true for undefined", function () {
      expect(isPrimitive(undefined)).to.be.true;
    });
  });
  describe(isString.name, function () {
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
  describe(isSymbol.name, function () {
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
  describe(isUndefined.name, function () {
    it("should return true for undefined", function () {
      expect(isUndefined(undefined)).to.be.true;
    });
    it("should return false for null", function () {
      expect(isUndefined(null)).to.be.false;
    });
    it("should return false for a string", function () {
      expect(isUndefined("undefined")).to.be.false;
    });
  });
});
