import test, { suite } from "node:test";
import { expect } from "@infra-blocks/test";
import { expectTypeOf } from "expect-type";
import type {
  AbstractConstructor,
  AsyncFactory,
  AsyncParser,
  AsyncProvider,
  AsyncTransform,
  Callable,
  Constructor,
  ErrorHandler,
  Factory,
  Parser,
  Provider,
  Transform,
  TypeGuard,
} from "../../src/index.js";

export const funcTests = () => {
  suite("func", () => {
    suite("AbstractConstructor", () => {
      test("should compile with an abstract constructor", () => {
        abstract class TestClass {}
        const _ctor: AbstractConstructor = TestClass;
      });

      test("should be instantiated with basic type constructors", () => {
        const _numberCtor: AbstractConstructor = Number;
        const _stringCtor: AbstractConstructor = String;
        const _booleanCtor: AbstractConstructor = Boolean;
        const _arrayCtor: AbstractConstructor = Array;
        const _objectCtor: AbstractConstructor = Object;
        const _functionCtor: AbstractConstructor = Function;
      });

      test("should work with a class that requires parameters", () => {
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

      test("should work with mixins", () => {
        function _bigMixin(Base: AbstractConstructor) {
          return class MixedUp extends Base {
            getName() {
              return "eeee wut?";
            }
          };
        }
      });
    });

    suite("Callable", () => {
      test("should work for a function without arguments and with no returns", () => {
        const _func: Callable = () => {
          return;
        };
      });

      test("should work for a function that throws", () => {
        const _func: Callable = (): never => {
          throw new Error("woopsy");
        };
      });

      test("should work for a regular function", () => {
        const _func: Callable = (
          _arg1: string,
          _arg2: number,
        ): { hello: string } => {
          return {
            hello: "pal",
          };
        };
      });

      test("should work for a callable type", () => {
        type Test = (...args: string[]) => void;
        const _test: Callable = ((_: string) => {}) as Test;
      });
    });

    suite("Constructor", () => {
      test("should not compile with an abstract constructor", () => {
        abstract class TestClass {}
        // @ts-expect-error Constructor cannot be abstract
        const _ctor: Constructor = TestClass;
      });

      test("basic type constructors should be assignable", () => {
        const _numberConstructor: Constructor = Number;
        const _stringConstructor: Constructor = String;
        const _booleanConstructor: Constructor = Boolean;
        const _arrayConstructor: Constructor = Array;
        const _objectConstructor: Constructor = Object;
        const _functionConstructor: Constructor = Function;
      });

      test("should work with a class", () => {
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

      test("should work with mixins", () => {
        function _bigMixin(Base: Constructor) {
          return class MixedUp extends Base {
            getName() {
              return "eeee wut?";
            }
          };
        }
      });
    });

    suite("Parser", () => {
      test("should assume unknown as the default input type", () => {
        expectTypeOf<Parser<string>>((stuff) => {
          expectTypeOf(stuff).toEqualTypeOf<unknown>();
          return "all good here";
        });
      });

      test("should compile for a function with specified input type", () => {
        expectTypeOf((_: string): number => {
          throw new Error("nope");
        }).toEqualTypeOf<Parser<number, string>>();
      });
    });

    suite("AsyncParser", () => {
      test("should assume unknown as the default input type", () => {
        expectTypeOf<AsyncParser<string>>((stuff) => {
          expectTypeOf(stuff).toEqualTypeOf<unknown>();
          return Promise.resolve("all good here");
        });
      });

      test("should compile for a function with specified input type", () => {
        expectTypeOf((_: string): Promise<number> => {
          throw new Error("nope");
        }).toEqualTypeOf<AsyncParser<number, string>>();
      });
    });

    suite("Provider", () => {
      test("should compile for a function without argument", () => {
        expectTypeOf<() => string>().toEqualTypeOf<Provider<string>>();
      });
    });

    suite("AsyncProvider", () => {
      test("should compile for an function without argument", () => {
        expectTypeOf<() => Promise<string>>().toEqualTypeOf<
          AsyncProvider<string>
        >();
      });
    });

    suite("Factory", () => {
      test("should compile for a function with parameters", () => {
        const func: Factory<[number, string], object> = (left, right) => ({
          twice: left * 2,
          greet: `Hello, ${right}!`,
        });
        expect(func(2, "t1t")).to.deep.equal({
          twice: 4,
          greet: "Hello, t1t!",
        });
      });
    });

    suite("AsyncFactory", () => {
      test("should compile for an function with parameters", () => {
        const func: AsyncFactory<[number, string], object> = (left, right) =>
          Promise.resolve({
            thrice: left * 3,
            greet: `Hello, ${right}!`,
          });
        expect(func(2, "tw4t")).to.eventually.deep.equal({
          thrice: 6,
          greet: "Hello, tw4t!",
        });
      });
    });

    suite("ErrorHandler", () => {
      test("should compile with unknown as default", () => {
        const myHandler: ErrorHandler = (err) => {
          expectTypeOf(err).toEqualTypeOf<unknown>();
        };
        myHandler(new Error("kaboomy"));
      });

      test("should compile with custom error", () => {
        class MyError extends Error {
          // biome-ignore lint/correctness/noUnusedPrivateClassMembers: Just testing
          private readonly otherField: string;
          constructor() {
            super("My Kaboomy");
            this.otherField = "toto";
          }
        }

        const myHandler: ErrorHandler<MyError> = (err) => {
          expectTypeOf(err).toEqualTypeOf<MyError>();
        };
        myHandler(new MyError());
      });
    });

    suite("Transform", () => {
      test("should compile with a valid function", () => {
        expectTypeOf((_: string): number => {
          throw new Error("nope");
        }).toEqualTypeOf<Transform<string, number>>();
      });
    });

    suite("AsyncTransform", () => {
      test("should compile with a valid function", () => {
        expectTypeOf((_: string): Promise<number> => {
          throw new Error("nope");
        }).toEqualTypeOf<AsyncTransform<string, number>>();
      });
    });

    suite("TypeGuard", () => {
      test("should infer uknown as the default parameter type", () => {
        function isString(value: unknown): value is string {
          return typeof value === "string";
        }
        const guard: TypeGuard<string> = isString;
        const value: unknown = 42;
        if (guard(value)) {
          expectTypeOf(value).toEqualTypeOf<string>();
        } else {
          expectTypeOf(value).toEqualTypeOf<unknown>();
        }
      });

      test("should work with a custom parameter type", () => {
        interface Identifiable {
          id: number;
        }
        function isIdentifiable(value: object): value is Identifiable {
          return "id" in value && typeof value.id === "number";
        }
        const guard: TypeGuard<Identifiable, object> = isIdentifiable;
        const value: object = { id: 42 };
        if (guard(value)) {
          expectTypeOf(value).toEqualTypeOf<Identifiable>();
        } else {
          expectTypeOf(value).toEqualTypeOf<object>();
        }
      });
    });
  });
};
