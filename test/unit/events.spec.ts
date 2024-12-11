import { Events, EmitterLikeBase } from "../../src/index.js";
import { expect, sinon } from "@infra-blocks/test";

/* eslint-disable @typescript-eslint/no-unused-vars */
describe("events", function () {
  describe("Events", function () {
    it("should work for types with callable keys", function () {
      interface TestEvents extends Events {
        ok: () => void;
        another: (value: string) => void;
        thisWorks: (value: number, other: string) => number;
      }
    });
    it("should not work for types with non-callable keys", function () {
      interface TestEvents extends Events {
        ok: () => void;
        // @ts-expect-error notOk is not callable.
        notOk: string;
      }
    });
  });

  describe("EmitterLikeBase", function () {
    it("should work as expected", function () {
      type TestEvents = {
        numberEvent: (value: number) => void;
        stringEvent: (value: string) => void;
      };

      class MyTestEmitter extends EmitterLikeBase<TestEvents> {
        callMe() {
          this.emit("numberEvent", 42);
          this.emit("stringEvent", "Hello");
        }
      }

      const emitter = new MyTestEmitter();
      const numberHandler = sinon.fake();
      const stringHandler = sinon.fake();
      emitter.on("numberEvent", numberHandler);
      emitter.on("stringEvent", stringHandler);
      emitter.callMe();
      expect(numberHandler).to.have.been.calledOnceWith(42);
      expect(stringHandler).to.have.been.calledOnceWith("Hello");
    });
  });
});
