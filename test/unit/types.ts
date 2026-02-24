import test, { suite } from "node:test";
import { expect, expectTypeOf } from "@infra-blocks/test";
import {
  type Brand,
  type EnvironmentVariables,
  isString,
  type KeyOfType,
  type MapKeys,
  type Optional,
  type Phantom,
  type Primitive,
  type TemplateExpression,
  type TransitivePartial,
  type UnpackedArray,
  type WithPartial,
  type WithRequired,
} from "../../src/index.js";

export const typeTests = () => {
  suite("types", () => {
    suite("Brand", () => {
      test("should work as expected with a string brand", () => {
        type UserId = string & Brand<"UserId">;
        type OrderId = string & Brand<"OrderId">;

        const plain = "hello";
        // @ts-expect-error cannot assign the unbranded version to the branded one.
        let _branded: UserId = plain;
        // @ts-expect-error cannot assign a plain string to a branded type.
        _branded = plain as OrderId;
      });

      test("should work as expected with a number brand", () => {
        type UserId = string & Brand<5>;
        type OrderId = string & Brand<10>;

        const plain = "hello";
        // @ts-expect-error cannot assign the unbranded version to the branded one.
        let _branded: UserId = plain;
        // @ts-expect-error cannot assign a plain string to a branded type.
        _branded = plain as OrderId;
      });

      test("should work as expected with a symbol brand", () => {
        const userIdSymbol = Symbol("UserId");
        const orderIdSymbol = Symbol("OrderId");
        type UserId = string & Brand<typeof userIdSymbol>;
        type OrderId = string & Brand<typeof orderIdSymbol>;

        const plain = "hello";
        // @ts-expect-error cannot assign the unbranded version to the branded one.
        let _branded: UserId = plain;
        // @ts-expect-error cannot assign a plain string to a branded type.
        _branded = plain as OrderId;
      });
    });

    suite("EnvVars", () => {
      test("should work for process.env", () => {
        const env: EnvironmentVariables = process.env;
        expect(env).to.be.an("object");
      });
    });

    suite("KeyOfType", () => {
      interface TestType {
        firstName: string;
        lastName: string;
        x: number;
        y: number;
        z: number;
        getAge: () => number;
        getStuff: () => string;
      }

      test("should compile with keys of type number", () => {
        const func = (arg: KeyOfType<TestType, number>): string => arg;
        // Those are the only values for which it compiles.
        func("x");
        func("y");
        func("z");
        // @ts-expect-error firstName is not a number.
        func("firstName");
        // @ts-expect-error lastName is not a number.
        func("lastName");
        // @ts-expect-error getAge is not a number.
        func("getAge");
        // @ts-expect-error getStuff is not a number.
        func("getStuff");
      });
    });

    suite("MapKeys", () => {
      interface TestType {
        firstName: string;
        lastName: string;
        x: number;
        y: number;
        z: number;
        getAge: () => number;
        getStuff: () => string;
      }

      test("should remap all keys", () => {
        type MappedType = MapKeys<TestType, Date>;
        // Any key returns a date.
        const _func = <K extends keyof MappedType>(m: MappedType, k: K): Date =>
          m[k];
      });
    });

    suite("Optional", () => {
      interface MyType {
        one: number;
        two: string;
        three: boolean;
      }

      test("should work with subset of fields", () => {
        const myStuff: Optional<MyType, "one" | "two"> = {
          one: 1,
          three: true,
        };
        // @ts-expect-error one can be undefined.
        const _one: number = myStuff.one;
        // @ts-expect-error two can be undefined.
        const _two: string = myStuff.two;
        // This is fine because three is not optional.
        const _three: boolean = myStuff.three;
      });
      test("should not compile with a field that is not a key", () => {
        // @ts-expect-error four is not a key of MyType.
        const _myStuff: Optional<MyType, "four"> = {
          one: 1,
          two: "two",
          three: true,
        };
      });
    });

    suite("Phantom", () => {
      test("should compile and allow to track a type parameter", () => {
        type MyType<T> = { greet(): string } & Phantom<T>;
        const _: MyType<number> = {
          greet: () => "hello",
        };
      });
    });

    suite("Primitive", () => {
      function canYouEven(_: Primitive): void {
        // Do nothing.
      }

      test("should not compile with an object", () => {
        // @ts-expect-error object is not a Primitive.
        canYouEven({});
      });

      test("should not compile with an array", () => {
        // @ts-expect-error array is not a Primitive.
        canYouEven([]);
      });

      test("should compile with bigint", () => {
        canYouEven(42n);
      });

      test("should compile with boolean", () => {
        canYouEven(true);
      });

      test("should compile with null", () => {
        canYouEven(null);
      });

      test("should compile with number", () => {
        canYouEven(42);
      });

      test("should compile with string", () => {
        canYouEven("hello");
      });

      test("should compile with symbol", () => {
        canYouEven(Symbol("test"));
      });

      test("should compile with undefined", () => {
        canYouEven(undefined);
      });
    });

    suite("TemplateExpression", () => {
      function testTemplateLiteral(value: TemplateExpression): string {
        return `${value}`;
      }

      test("should work with string", () => {
        // Checking both compilation and runtime behavior.
        expect(testTemplateLiteral("hello")).to.equal("hello");
      });

      test("should work with number", () => {
        expect(testTemplateLiteral(42)).to.equal("42");
      });

      test("should work with bigint", () => {
        expect(testTemplateLiteral(42n)).to.equal("42");
      });

      test("should work with boolean", () => {
        expect(testTemplateLiteral(true)).to.equal("true");
      });

      test("should work with null", () => {
        expect(testTemplateLiteral(null)).to.equal("null");
      });

      test("should work with undefined", () => {
        expect(testTemplateLiteral(undefined)).to.equal("undefined");
      });

      test("should work with object", () => {
        expect(testTemplateLiteral({ key: "value" })).to.equal(
          "[object Object]",
        );
      });

      test("should work with array", () => {
        expect(testTemplateLiteral(["one", "two", "three"])).to.equal(
          "one,two,three",
        );
      });

      test("should not compile with symbol", () => {
        // @ts-expect-error symbol is not allowed in TemplateExpression.
        expect(() => testTemplateLiteral(Symbol("test"))).to.throw();
      });
    });

    suite("TransitivePartial", () => {
      test("should compile with nested partial objects", () => {
        const myType = {
          one: 1,
          two: 2,
          three: {
            threeOne: "threeOne",
            threeTwo: "threeTwo",
          },
        };
        const func = (_x: TransitivePartial<typeof myType>): number => 0;
        // Works with empty object.
        func({});
        // Notice how we don't have to provide the second field of the nested object.
        func({ three: { threeOne: "toto" } });
      });
    });

    suite("UnpackedArray", () => {
      test("should work for an array of string", () => {
        const array = ["one", "two", "three"];
        const myStuff: UnpackedArray<typeof array> = "four";
        isString(myStuff);
      });
    });

    suite("WithPartial", () => {
      type TestType = {
        yes: string;
        no: string;
        maybe?: string;
        dunno?: unknown;
      };

      test("should have no impact if the field is already partial", () => {
        expectTypeOf<
          WithPartial<TestType, "maybe">
        >().branded.toEqualTypeOf<TestType>();
      });

      test("should correctly make a field partial", () => {
        expectTypeOf<WithPartial<TestType, "yes">>().branded.toEqualTypeOf<{
          yes?: string;
          no: string;
          maybe?: string;
          dunno?: unknown;
        }>();
      });

      test("should work with several fields", () => {
        expectTypeOf<
          WithPartial<TestType, "yes" | "no">
        >().branded.toEqualTypeOf<Partial<TestType>>();
      });
    });

    suite("WithRequired", () => {
      type TestType = {
        yes: string;
        no: string;
        maybe?: string;
        dunno?: unknown;
      };

      test("should have no impact if the field is already required", () => {
        expectTypeOf<
          WithRequired<TestType, "yes">
        >().branded.toEqualTypeOf<TestType>();
      });

      test("should correctly make a field required", () => {
        expectTypeOf<WithRequired<TestType, "maybe">>().branded.toEqualTypeOf<{
          yes: string;
          no: string;
          maybe: string;
          dunno?: unknown;
        }>();
      });

      test("should work with several fields", () => {
        expectTypeOf<
          WithRequired<TestType, "maybe" | "dunno">
        >().branded.toEqualTypeOf<Required<TestType>>();
      });
    });
  });
};
