import test, { suite } from "node:test";
import { expect } from "@infra-blocks/test";
import { trusted, unreachable } from "../../src/index.js";
import { funcTests } from "./func.js";
import { guardTests } from "./guard.js";
import { predicateTests } from "./predicates.js";
import { typeTests } from "./types.js";

suite("suite", () => {
  funcTests();
  guardTests();
  predicateTests();
  typeTests();

  suite(trusted.name, () => {
    test("should work with the example", () => {
      type BullshitType = {
        contentz?: string;
      };
      const value: BullshitType = {
        contentz: "toto",
      };
      const content: string = trusted(value.contentz);
      content.toUpperCase();
    });
  });

  suite(unreachable.name, () => {
    test("should throw when called", () => {
      // @ts-expect-error "coucou" cannot be assigned to never.
      expect(() => unreachable("coucou")).to.throw();
    });

    test("should enforce exhaustiveness in switch statements", () => {
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
