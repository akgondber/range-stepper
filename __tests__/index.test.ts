import { describe, it, expect, beforeEach } from "vitest";
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

    it("raises an error if max value is wrong", () => {
      expect(() => {
        new RangeStepper({ min: 5, max: 2, current: 7 });
      }).toThrowError(/must be greater or equals to/);
    });

    it("raises an error if max value is wrong and inclusive options is enabled", () => {
      expect(() => {
        new RangeStepper({ min: 5, max: 2, current: 7, inclusive: false });
      }).toThrowError(/must be greater than/);
    });

    it("raises an error if max value equals to min and inclusive option is not enabled", () => {
      expect(() => {
        new RangeStepper({ min: 5, max: 5, inclusive: false });
      }).toThrowError(/must be greater than/);
    });

    it("does not raise an error if max value equals to min and inclusive option is enabled", () => {
      expect(() => {
        new RangeStepper({ min: 0, max: 0, inclusive: true });
      }).not.toThrowError();
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

  describe(".first", () => {
    beforeEach(() => {
      stepper = new RangeStepper({ min, max, current: 4 });
    });

    it("moves current value to the first position", () => {
      stepper.first();

      expect(stepper.value).toBe(min);
    });
  });

  describe(".last", () => {
    beforeEach(() => {
      stepper = new RangeStepper({ min, max, current: 2 });
    });

    it("moves current value to the last position", () => {
      stepper.last();

      expect(stepper.value).toBe(max);
    });
  });

  describe(".min", () => {
    let min = 1;
    beforeEach(() => {
      stepper = new RangeStepper({ min, max, current });
    });

    it("returns current value", () => {
      expect(stepper.min).toBe(1);
    });
  });

  describe(".max", () => {
    let max = 23;
    beforeEach(() => {
      stepper = new RangeStepper({ min, max, current });
    });

    it("returns current value", () => {
      expect(stepper.max).toBe(23);
    });
  });

  describe(".step", () => {
    let step = 4;
    beforeEach(() => {
      stepper = new RangeStepper({ min, max, step, current });
    });

    it("returns current value", () => {
      expect(stepper.step).toBe(4);
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

  describe(".current", () => {
    let currentVal = 19;
    beforeEach(() => {
      stepper = new RangeStepper({ min, max: 37, current: currentVal });
    });

    it("returns current value", () => {
      expect(stepper.current).toBe(currentVal);
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

  describe(".isCurrent", () => {
    it("returns true if the current pointer equals to provided value", () => {
      min = 0;
      current = 5;
      stepper = new RangeStepper({ min, max, current, step });

      expect(stepper.isCurrent(5)).toBe(true);
    });

    it("returns false if the current pointer differs from provided value", () => {
      min = 0;
      current = 5;
      stepper = new RangeStepper({ min, max, current, step });

      expect(stepper.isCurrent(2)).toBe(false);
    });
  });

  describe(".isSingle", () => {
    it("returns true if max value equals to min value", () => {
      min = 0;
      max = 0;
      current = 0;
      stepper = new RangeStepper({ min, max, current });

      expect(stepper.isSingle()).toBe(true);
    });

    it("returns false if max value greater than min value", () => {
      min = 0;
      max = 5;
      current = 1;
      stepper = new RangeStepper({ min, max, current });

      expect(stepper.isSingle()).toBe(false);
    });
  });

  describe(".setValue", () => {
    let inclusive;

    beforeEach(() => {
      inclusive = false;

      stepper = new RangeStepper({ min: 1, max: 2, inclusive });
    });

    describe("when inclusive mode is not enabled", () => {
      it("raises an error if value is greater than max", () => {
        expect(() => {
          stepper.setValue(3);
        }).toThrowError(/value must be in the range 1...2/);
      });
    });

    describe("when inclusive mode is enabled", () => {
      beforeEach(() => {
        inclusive = true;

        stepper = new RangeStepper({ min: 1, max: 2, inclusive });
      });

      it("does not raises an error if new value equals to max", () => {
        expect(() => {
          stepper.setValue(2);
        }).not.toThrowError(/value must be in the range/);
      });
    });
  });

  describe(".clone", () => {
    beforeEach(() => {
      max = 18;
      current = 12;

      stepper = new RangeStepper({
        min,
        max,
        step,
        current,
      });
    });

    it("builds a new instance", () => {
      const result = stepper.clone();

      expect(result.value).toEqual(stepper.value);
    });

    it("clones an instance when the inclusive option is enabled", () => {
      stepper = new RangeStepper({ min: 0, max: 0, inclusive: true });

      expect(() => {
        stepper.dup();
      }).not.toThrowError();
    });
  });

  describe(".dup", () => {
    beforeEach(() => {
      max = 19;
      current = 15;

      stepper = new RangeStepper({
        min,
        max,
        step,
        current,
      });
    });

    it("builds a new instance", () => {
      const result = stepper.dup();

      expect(result.max).toEqual(19);
      expect(result.value).toEqual(stepper.value);
    });
  });

  describe(".asObject", () => {
    beforeEach(() => {
      max = 18;
      current = 12;

      stepper = new RangeStepper({
        min,
        max,
        step,
        current,
      });
    });

    it("builds a new instance", () => {
      expect(stepper.asObject()).toEqual({ min, max, step, current });
    });
  });
});
