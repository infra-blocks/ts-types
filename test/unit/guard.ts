import test, { suite } from "node:test";
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

export const guardTests = () => {
  suite("guard", () => {
    suite(isBigint.name, () => {
      test("should return false for undefined", () => {
        expect(isBigint(undefined)).to.be.false;
      });

      test("should return false for null", () => {
        expect(isBigint(null)).to.be.false;
      });

      test("should return false for number", () => {
        expect(isBigint(42)).to.be.false;
      });

      test("should return true for bigint", () => {
        expect(isBigint(42n)).to.be.true;
      });
    });

    suite(isBoolean.name, () => {
      test("should return false for undefined", () => {
        expect(isBoolean(undefined)).to.be.false;
      });

      test("should return false for null", () => {
        expect(isBoolean(null)).to.be.false;
      });

      test("should return false for string", () => {
        expect(isBoolean("true")).to.be.false;
      });

      test("should return true for true", () => {
        expect(isBoolean(true)).to.be.true;
      });

      test("should return true for false", () => {
        expect(isBoolean(false)).to.be.true;
      });
    });

    suite(isFunction.name, () => {
      test("should return false for undefined", () => {
        expect(isFunction(undefined)).to.be.false;
      });

      test("should return false for null", () => {
        expect(isFunction(null)).to.be.false;
      });

      test("should return false for a non function value", () => {
        expect(isFunction("function")).to.be.false;
      });

      test("should return true for a lambda", () => {
        expect(isFunction(() => 5)).to.be.true;
      });

      test("should return true for a named function", () => {
        function theFunk(): string {
          return "funk";
        }
        expect(isFunction(theFunk)).to.be.true;
      });

      test("should return true for an object method", () => {
        class Toto {
          sayWhat(): string {
            return "what";
          }
        }

        const instance = new Toto();
        expect(isFunction(instance.sayWhat.bind(instance))).to.be.true;
      });
    });

    suite(isNumber.name, () => {
      test("should return false for undefined", () => {
        expect(isNumber(undefined)).to.be.false;
      });

      test("should return false for null", () => {
        expect(isNumber(null)).to.be.false;
      });

      test("should return false for non number value", () => {
        expect(isNumber("42")).to.be.false;
      });

      test("should return true for number value", () => {
        expect(isNumber(42)).to.be.true;
      });
    });

    suite(isNull.name, () => {
      test("should return false for undefined", () => {
        expect(isNull(undefined)).to.be.false;
      });

      test("should return true for null", () => {
        expect(isNull(null)).to.be.true;
      });

      test("should return false for string", () => {
        expect(isNull("null")).to.be.false;
      });
    });

    suite(isObject.name, () => {
      test("should return false for undefined", () => {
        expect(isObject(undefined)).to.be.false;
      });

      test("should return true for null", () => {
        expect(isObject(null)).to.be.true;
      });

      test("should return false for a string", () => {
        expect(isObject("object")).to.be.false;
      });

      test("should return true for a record", () => {
        expect(isObject({})).to.be.true;
      });

      test("should return true for an instance of a class", () => {
        class MyClass {}
        expect(isObject(new MyClass())).to.be.true;
      });
    });

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

    suite(isPrimitive.name, () => {
      test("should return false for an object", () => {
        expect(isPrimitive({})).to.be.false;
      });

      test("should return false for an array", () => {
        expect(isPrimitive([])).to.be.false;
      });

      test("should return true for a bigint", () => {
        expect(isPrimitive(42n)).to.be.true;
      });

      test("should return true for a boolean", () => {
        expect(isPrimitive(true)).to.be.true;
      });

      test("should return true for null", () => {
        expect(isPrimitive(null)).to.be.true;
      });

      test("should return true for a number", () => {
        expect(isPrimitive(42)).to.be.true;
      });

      test("should return true for a string", () => {
        expect(isPrimitive("I am a string")).to.be.true;
      });

      test("should return true for a symbol", () => {
        expect(isPrimitive(Symbol("toto"))).to.be.true;
      });

      test("should return true for undefined", () => {
        expect(isPrimitive(undefined)).to.be.true;
      });
    });

    suite(isString.name, () => {
      test("should return false for undefined", () => {
        expect(isString(undefined)).to.be.false;
      });

      test("should return false for null", () => {
        expect(isString(null)).to.be.false;
      });

      test("should return false for non string value", () => {
        expect(isString(4)).to.be.false;
      });

      test("should return true for string value", () => {
        expect(isString("I am a string")).to.be.true;
      });

      test("should return true with falsy string value", () => {
        expect(isString("")).to.be.true;
      });
    });

    suite(isSymbol.name, () => {
      test("should return false for undefined", () => {
        expect(isSymbol(undefined)).to.be.false;
      });

      test("should return false for null", () => {
        expect(isSymbol(null)).to.be.false;
      });

      test("should return false for non symbol value", () => {
        expect(isSymbol("toto")).to.be.false;
      });

      test("should return true for symbol value", () => {
        expect(isSymbol(Symbol("toto"))).to.be.true;
      });
    });

    suite(isUndefined.name, () => {
      test("should return true for undefined", () => {
        expect(isUndefined(undefined)).to.be.true;
      });

      test("should return false for null", () => {
        expect(isUndefined(null)).to.be.false;
      });

      test("should return false for a string", () => {
        expect(isUndefined("undefined")).to.be.false;
      });
    });
  });
};
