import { expect } from "@infra-blocks/test";
import { trusted, unreachable } from "../../src/index.js";

// Most of the The tests here just showcase the good use cases when it compiles.
// So the test don't actually do much besides showing compilation.
describe("types", () => {
  describe(trusted.name, () => {
    it("should work with the example", () => {
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
  describe(unreachable.name, () => {
    it("should throw when called", () => {
      // @ts-expect-error "coucou" cannot be assigned to never.
      expect(() => unreachable("coucou")).to.throw();
    });
    it("should enforce exhaustiveness in switch statements", () => {
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
