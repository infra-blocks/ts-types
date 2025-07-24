import { expect } from "@infra-blocks/test";
import { unreachable } from "../../src/index.js";

// Most of the The tests here just showcase the good use cases when it compiles.
// So the test don't actually do much besides showing compilation.
describe("types", function () {
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
