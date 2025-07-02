import { expect } from "@infra-blocks/test";
import {
  EnvironmentVariables,
  isString,
  KeyOfType,
  TransitivePartial,
  UnpackedArray,
  unreachable,
} from "../../src/index.js";

describe("types", function () {
  describe("EnvVars", function () {
    // The tests here just showcase the good use cases when it compiles.
    it("should work for process.env", function () {
      const env: EnvironmentVariables = process.env;
      expect(env).to.be.an("object");
    });
  });
  describe("UnpackedArray", function () {
    // The tests here just showcase the good use cases when it compiles.
    it("should work for an array of string", function () {
      const array = ["one", "two", "three"];
      const myStuff: UnpackedArray<typeof array> = "four";
      expect(isString(myStuff)).to.be.true;
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
  describe(unreachable.name, function () {
    it("should enforce exhaustiveness in switch statements", function () {
      type BigType = "penus" | "penii";
      function doStuff(x: BigType) {
        switch (x) {
          case "penus":
            expect(true).to.be.true;
            break;
          case "penii":
            expect(true).to.be.false;
            break;
          default:
            unreachable(x); // This will not compile if the switch is not exhaustive.
        }
      }
      doStuff("penus");
    });
  });
});
