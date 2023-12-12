import {
  isNumber,
  isString,
  isSymbol,
  isFunction,
  UnpackedArray,
  UnpackedPromise,
  ErrorHandler,
  TransitivePartial,
  KeyOfType,
} from "../../src/index.js";
import { expect } from "@infra-blocks/test";

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
  describe("ErrorHandler", function () {
    it("should compile with classic errors as default", function () {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      let error: Error;
      const myHandler: ErrorHandler = (err) => {
        error = err;
      };
      myHandler(new Error("kaboomy"));
    });
    it("should compile with custom error", function () {
      class MyError extends Error {
        private readonly otherField: string;
        constructor() {
          super("My Kaboomy");
          this.otherField = "toto";
        }
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      let error: MyError;
      const myHandler: ErrorHandler<MyError> = (err) => {
        error = err;
      };
      myHandler(new MyError());
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
