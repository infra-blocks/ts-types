import { expect } from "@infra-blocks/test";
import { assert, type IsExact } from "conditional-type-checks";
import type {
  AbstractConstructor,
  AsyncFactory,
  AsyncProvider,
  Callable,
  Constructor,
  ErrorHandler,
  Factory,
  Provider,
  TypeGuard,
} from "../../src/index.js";

// TODO: use conditional type checks where applicable to reduce number of eslint escapes.
describe("func", () => {
  describe("AbstractConstructor", () => {
    it("should compile with an abstract constructor", () => {
      abstract class TestClass {}
      const _ctor: AbstractConstructor = TestClass;
    });
    it("should be instantiated with basic type constructors", () => {
      const _numberCtor: AbstractConstructor = Number;
      const _stringCtor: AbstractConstructor = String;
      const _booleanCtor: AbstractConstructor = Boolean;
      const _arrayCtor: AbstractConstructor = Array;
      const _objectCtor: AbstractConstructor = Object;
      const _functionCtor: AbstractConstructor = Function;
    });
    it("should work with a class that requires parameters", () => {
      class MyClass {
        // biome-ignore lint/complexity/noUselessConstructor: part of the test case.
        constructor(_l: number, _r: string) {}
      }
      // Works without type hints.
      let _ctor: AbstractConstructor = MyClass;
      // Or with.
      _ctor = MyClass as AbstractConstructor<MyClass>;
      _ctor = MyClass as AbstractConstructor<MyClass, [number, string]>;
    });
    it("should work with mixins", () => {
      function _bigMixin(Base: AbstractConstructor) {
        return class MixedUp extends Base {
          getName() {
            return "eeee wut?";
          }
        };
      }
    });
  });
  // A lot of the tests here just check for compilation, so we have a bunch of unused variables.
  describe("Callable", () => {
    it("should work for a function without arguments and with no returns", () => {
      const _func: Callable = () => {
        return;
      };
    });
    it("should work for a function that throws", () => {
      const _func: Callable = (): never => {
        throw new Error("woopsy");
      };
    });
    it("should work for a regular function", () => {
      const _func: Callable = (
        _arg1: string,
        _arg2: number,
      ): { hello: string } => {
        return {
          hello: "pal",
        };
      };
    });
    it("should work for a callable type", () => {
      type Test = (...args: string[]) => void;
      const _test: Callable = ((_: string) => {}) as Test;
    });
  });
  describe("Constructor", () => {
    it("should not compile with an abstract constructor", () => {
      abstract class TestClass {}
      // @ts-expect-error Constructor cannot be abstract
      const _ctor: Constructor = TestClass;
    });
    it("basic type constructors should be assignable", () => {
      const _numberConstructor: Constructor = Number;
      const _stringConstructor: Constructor = String;
      const _booleanConstructor: Constructor = Boolean;
      const _arrayConstructor: Constructor = Array;
      const _objectConstructor: Constructor = Object;
      const _functionConstructor: Constructor = Function;
    });
    it("should work with a class", () => {
      class MyClass {
        // biome-ignore lint/correctness/noUnusedPrivateClassMembers: Just testing.
        private readonly _left: number;
        // biome-ignore lint/correctness/noUnusedPrivateClassMembers: Just testing.
        private readonly _right: string;

        constructor(left: number, right: string) {
          this._left = left;
          this._right = right;
        }
      }
      // Works without type hints.
      let _ctor: Constructor = MyClass;
      // Or with.
      _ctor = MyClass as Constructor<MyClass>;
      _ctor = MyClass as Constructor<MyClass, [number, string]>;
    });
    it("should work with mixins", () => {
      function _bigMixin(Base: Constructor) {
        return class MixedUp extends Base {
          getName() {
            return "eeee wut?";
          }
        };
      }
    });
  });
  describe("Provider", () => {
    it("should compile for a function without argument", () => {
      const func: Provider<string> = () => "toto";
      expect(func()).to.equal("toto");
    });
  });
  describe("AsyncProvider", () => {
    it("should compile for an async function without argument", async () => {
      const func: AsyncProvider<string> = () => Promise.resolve("toto");
      await expect(func()).to.eventually.equal("toto");
    });
  });
  describe("Factory", () => {
    it("should compile for a function with parameters", () => {
      const func: Factory<[number, string], object> = (left, right) => ({
        twice: left * 2,
        greet: `Hello, ${right}!`,
      });
      expect(func(2, "t1t")).to.deep.equal({ twice: 4, greet: "Hello, t1t!" });
    });
  });
  describe("AsyncFactory", () => {
    it("should compile for an async function with parameters", async () => {
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
  describe("ErrorHandler", () => {
    it("should compile with classic errors as default", () => {
      const myHandler: ErrorHandler = (_) => {
        assert<IsExact<Error, typeof _>>(true);
      };
      myHandler(new Error("kaboomy"));
    });
    it("should compile with custom error", () => {
      class MyError extends Error {
        // biome-ignore lint/correctness/noUnusedPrivateClassMembers: Just testing
        private readonly otherField: string;
        constructor() {
          super("My Kaboomy");
          this.otherField = "toto";
        }
      }

      const myHandler: ErrorHandler<MyError> = (_) => {
        assert<IsExact<MyError, typeof _>>(true);
      };
      myHandler(new MyError());
    });
  });
  describe("TypeGuard", () => {
    it("should infer uknown as the default parameter type", () => {
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
    it("should work with a custom parameter type", () => {
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
