import { expect } from "@infra-blocks/test";
import {
  AsyncFactory,
  AsyncProvider,
  Callable,
  Constructor,
  ErrorHandler,
  Factory,
  Provider,
  TypeGuard,
} from "../../src/index.js";
import { assert, IsExact } from "conditional-type-checks";

// TODO: use conditional type checks where applicable to reduce number of eslint escapes.
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
  describe("Factory", function () {
    it("should compile for a function with parameters", function () {
      const func: Factory<[number, string], object> = (left, right) => ({
        twice: left * 2,
        greet: `Hello, ${right}!`,
      });
      expect(func(2, "t1t")).to.deep.equal({ twice: 4, greet: "Hello, t1t!" });
    });
  });
  describe("AsyncFactory", function () {
    it("should compile for an async function with parameters", async function () {
      const func: AsyncFactory<[number, string], object> = (left, right) =>
        Promise.resolve({
          thrice: left * 3,
          greet: `Hello, ${right}!`,
        });
      await expect(func(2, "tw4t")).to.eventually.deep.equal({
        thrice: 6,
        greet: "Hello, tw4t!",
      });
    });
  });
  describe("ErrorHandler", function () {
    it("should compile with classic errors as default", function () {
      const myHandler: ErrorHandler = (err) => {
        assert<IsExact<Error, typeof err>>(true);
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

      const myHandler: ErrorHandler<MyError> = (err) => {
        assert<IsExact<MyError, typeof err>>(true);
      };
      myHandler(new MyError());
    });
  });
  describe("TypeGuard", function () {
    it("should infer uknown as the default parameter type", function () {
      function isString(value: unknown): value is string {
        return typeof value === "string";
      }
      const guard: TypeGuard<string> = isString;
      const value: unknown = 42;
      if (guard(value)) {
        assert<IsExact<string, typeof value>>(true);
      } else {
        assert<IsExact<unknown, typeof value>>(true);
      }
    });
    it("should work with a custom parameter type", function () {
      interface Identifiable {
        id: number;
      }
      function isIdentifiable(value: object): value is Identifiable {
        return "id" in value && typeof value.id === "number";
      }
      const guard: TypeGuard<Identifiable, object> = isIdentifiable;
      const value: object = { id: 42 };
      if (guard(value)) {
        assert<IsExact<Identifiable, typeof value>>(true);
      } else {
        assert<IsExact<object, typeof value>>(true);
      }
    });
  });
});
