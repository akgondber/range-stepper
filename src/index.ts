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
  constructor({ min = 0, max, step = 1, current }: StepperConfig) {
    if (max <= min) {
      throw new Error(`max must be greater than min`);
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
   * Get current value
   *
   * @returns current value
   */
  get value() {
    return this.#value;
  }

  private ensureInRange(value: number) {
    if (value > this.#max && value < this.#min) {
      throw new Error(`value must be in [${this.#min}..${this.#max}]`);
    }
  }
}

export default RangeStepper;
