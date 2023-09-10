import { StepperConfig } from "./interfaces";

export { StepperConfig };

class RangeStepper {
  #min: number;
  #max: number;
  #value: number;
  #step: number;

  /**
   *
   * Creates a new stepper object
   * @param min - minimum value
   * @param max - maximum value
   * @param step - step to be used when moving to next or previous position
   * @params current - current value (default is min value)
   */
  constructor({
    min = 0,
    max,
    step = 1,
    current,
    single = false,
  }: StepperConfig) {
    if (max <= min) {
      if (!(max === min && single)) {
        throw new Error(`max must be greater than min`);
      }
    }

    this.#min = min;
    this.#max = max;
    this.#step = step;
    this.#value = typeof current !== "undefined" ? current : min;
  }

  /**
   * Moves a current value forward by specified step.
   *
   * @example
   *
   * ```ts
   * const stepper : RangeStepper = new RangeStepper({ min: 2, max: 12 });
   * stepper.next();
   * console.log(stepper.value); // 3
   * ```
   *
   * @returns {this} a self instance which can be useful for chaining
   */
  next() {
    const newValue = this.#value + this.#step;
    this.#value = newValue > this.#max ? this.#min : newValue;
    return this;
  }

  /**
   * Moves a current value backward by specified step.
   *
   * ```ts
   * const stepper : RangeStepper = new RangeStepper({ min: 2, max: 12, current: 6 });
   * stepper.previous();
   * console.log(stepper.value); // 5
   * ```
   *
   * @returns an instance which can be useful for chaining
   */
  previous() {
    const newValue = this.#value - this.#step;
    this.#value = newValue < 0 ? this.#max : newValue;
    return this;
  }

  /**
   * Sets a new current value
   * @param newValue - new current value
   *
   * @throws {Error} if provided value outside of range [min..max]
   */
  setValue(newValue: number) {
    this.ensureInRange(newValue);
    this.#value = newValue;
  }

  /**
   * Check whether current value reached the maximum value taking into account a step
   */
  hasNext() {
    return this.#value + this.#step <= this.#max;
  }

  /**
   * Check whether current value reached the minimum value taking into account a step
   */
  hasPrevious() {
    return this.#value - this.#step >= this.#min;
  }

  /**
   * Check whether provided value is the current value
   *
   * @returns true if the current pointer equals to num, false otherwise
   */
  isCurrent(num: number) {
    return this.#value === num;
  }

  /**
   * Moves current value to the start
   * ```ts
   * const stepper : RangeStepper = new RangeStepper({ min: 2, max: 12, current: 6 });
   * console.log(stepper.value); // 6
   * stepper.first();
   * console.log(stepper.value); // 2
   * ```
   * @returns an instance which can be useful for chaining
   */
  first() {
    this.#value = this.#min;
    return this;
  }

  /**
   * Moves a current value to the end
   * ```ts
   * const stepper : RangeStepper = new RangeStepper({ min: 2, max: 12, current: 6 });
   * console.log(stepper.value); // 6
   * stepper.last();
   * console.log(stepper.value); // 12
   * ```
   * @returns an instance which can be useful for chaining
   */
  last() {
    this.#value = this.#max;
    return this;
  }
  /**
   * Build a clone based on current instance
   *
   * @returns A clone for the current instance
   */
  clone() {
    return new RangeStepper({
      min: this.#min,
      max: this.#max,
      step: this.#step,
      current: this.#value,
    });
  }

  /**
   * An alias for the `clone` method
   *
   * @returns A clone for the current instance
   */
  dup() {
    return this.clone();
  }

  /**
   * Get min value
   *
   * @returns min value
   */
  get min() {
    return this.#min;
  }

  /**
   * Get max value
   *
   * @returns max value
   */
  get max() {
    return this.#max;
  }

  /**
   * Get step value
   *
   * @returns step value
   */
  get step() {
    return this.#step;
  }

  /**
   * Get current value
   *
   * @returns current value
   */
  get value() {
    return this.#value;
  }

  /**
   * Get current value
   *
   * @returns current value
   */
  get current() {
    return this.value;
  }

  asObject(): StepperConfig {
    return {
      min: this.#min,
      max: this.#max,
      step: this.#step,
      current: this.#value,
    };
  }

  private ensureInRange(value: number) {
    if (value > this.#max && value < this.#min) {
      throw new Error(`value must be in [${this.#min}..${this.#max}]`);
    }
  }
}

export default RangeStepper;
