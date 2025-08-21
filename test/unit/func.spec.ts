import { expect } from "@infra-blocks/test";
import {
  AsyncProvider,
  Callable,
  Constructor,
  ErrorHandler,
  Provider,
} from "../../src/index.js";

describe("func", function () {
  // A lot of the tests here just check for compilation, so we have a bunch of unused variables.
  /* eslint-disable @typescript-eslint/no-unused-vars */
  describe("Callable", function () {
    it("should work for a function without arguments and with no returns", function () {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const func: Callable = () => {
        return;
      };
    });
    it("should work for a function that throws", function () {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const func: Callable = (): never => {
        throw new Error("woopsy");
      };
    });
    it("should work for a regular function", function () {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const func: Callable = (
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        arg1: string,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        arg2: number
      ): { hello: string } => {
        return {
          hello: "pal",
        };
      };
    });
    it("should work for a callable type", function () {
      type Test = {
        (...args: string[]): void;
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function
      const test: Callable = ((hello: string) => {}) as Test;
    });
  });
  describe("Constructor", function () {
    it("basic type constructors should be assignable", function () {
      const numberConstructor: Constructor = Number;
      const stringConstructor: Constructor = String;
      const booleanConstructor: Constructor = Boolean;
      const arrayConstructor: Constructor = Array;
      const objectConstructor: Constructor = Object;
      const functionConstructor: Constructor = Function;
    });
    it("should work with a class", function () {
      class MyClass {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        constructor(left: number, right: string) {}
      }
      // Works without type hints.
      let constructor = MyClass;
      // Or with.
      constructor = MyClass as Constructor<MyClass>;
      constructor = MyClass as Constructor<MyClass, [number, string]>;
    });
    it("should work with mixins", function () {
      function bigMixin(Base: Constructor) {
        return class MixedUp extends Base {
          getName() {
            return "eeee wut?";
          }
        };
      }
    });
  });
  describe("Provider", function () {
    it("should compile for a function without argument", function () {
      const func: Provider<string> = () => "toto";
      expect(func()).to.equal("toto");
    });
  });
  describe("AsyncProvider", function () {
    it("should compile for an async function without argument", async function () {
      const func: AsyncProvider<string> = () => Promise.resolve("toto");
      await expect(func()).to.eventually.equal("toto");
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
});
