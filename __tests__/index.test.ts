import { describe, it, expect, beforeEach, afterEach, beforeAll } from "vitest";
import RangeStepper from "../src";

describe("RangeStepper", () => {
  let stepper: RangeStepper;
  let min = 0;
  let max = 6;
  let step = 1;
  let current: number;

  describe(".new", () => {
    it("creates an object with specified values", () => {
      stepper = new RangeStepper({ min: 5, max: 10, current: 8, step });

      stepper.next();
      expect(stepper.value).toBe(9);

      stepper.next();
      expect(stepper.value).toBe(10);

      stepper.next();
      expect(stepper.value).toBe(5);
    });

    it("throws an exception if max value is not greater than min", () => {
      expect(() => {
        new RangeStepper({ min: 5, max: 2, current: 7 });
      }).toThrowError(/must be greater than/);
    });
  });

  describe(".next", () => {
    beforeEach(() => {
      stepper = new RangeStepper({ min, max });
    });

    it("should increment value by step", () => {
      stepper.next();

      expect(stepper.value).toBe(1);
    });
  });

  describe(".previous", () => {
    beforeEach(() => {
      stepper = new RangeStepper({ min, max, current: 4 });
    });

    it("should increment value by step", () => {
      stepper.previous();

      expect(stepper.value).toBe(3);
    });

    it("should cyclically move to maximum value", () => {
      stepper = new RangeStepper({ min, max, current: min });
      stepper.previous();

      expect(stepper.value).toBe(max);
    });
  });

  describe(".value", () => {
    beforeEach(() => {
      stepper = new RangeStepper({ min, max, current: 2 });
    });

    it("returns current value", () => {
      expect(stepper.value).toBe(2);
    });
  });

  describe(".hasNext", () => {
    describe("current value is the last item taking into account a step", () => {
      beforeEach(() => {
        max = 16;
        current = 16;
        stepper = new RangeStepper({ min, max, current, step });
      });

      it("returns true", () => {
        expect(stepper.hasNext()).toBe(false);
      });
    });

    describe("current value is not the last item taking into account a step", () => {
      beforeEach(() => {
        max = 16;
        current = 10;
        stepper = new RangeStepper({ min, max, current, step });
      });

      it("returns true", () => {
        expect(stepper.hasNext()).toBe(true);
      });
    });
  });

  describe(".hasPrevious", () => {
    describe("current value is the first item taking into account a step", () => {
      it("returns true", () => {
        min = 0;
        current = 0;
        stepper = new RangeStepper({ min, max, current, step });

        expect(stepper.hasPrevious()).toBe(false);
      });
    });

    describe("current value is not the first item taking into account a step", () => {
      it("returns true", () => {
        min = 0;
        current = 4;
        stepper = new RangeStepper({ min, max, current, step });

        expect(stepper.hasPrevious()).toBe(true);
      });
    });
  });
});
