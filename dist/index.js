var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};

// src/index.ts
var _min, _max, _value, _step;
var RangeStepper = class {
  /**
   *
   * Creates a new stepper object
   * @param min - minimum value
   * @param max - maximum value
   * @param step - step to be used when moving to next or previous position
   * @params current - current value (default is min value)
   */
  constructor({ min = 0, max, step = 1, current }) {
    __privateAdd(this, _min, void 0);
    __privateAdd(this, _max, void 0);
    __privateAdd(this, _value, void 0);
    __privateAdd(this, _step, void 0);
    if (max <= min) {
      throw new Error(`max must be greater than min`);
    }
    __privateSet(this, _min, min);
    __privateSet(this, _max, max);
    __privateSet(this, _step, step);
    __privateSet(this, _value, typeof current !== "undefined" ? current : min);
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
    const newValue = __privateGet(this, _value) + __privateGet(this, _step);
    __privateSet(this, _value, newValue > __privateGet(this, _max) ? __privateGet(this, _min) : newValue);
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
    const newValue = __privateGet(this, _value) - __privateGet(this, _step);
    __privateSet(this, _value, newValue < 0 ? __privateGet(this, _max) : newValue);
    return this;
  }
  /**
   * Sets a new current value
   * @param newValue - new current value
   *
   * @throws {Error} if provided value outside of range [min..max]
   */
  setValue(newValue) {
    this.ensureInRange(newValue);
    __privateSet(this, _value, newValue);
  }
  /**
   * Check whether current value reached the maximum value taking into account a step
   */
  hasNext() {
    return __privateGet(this, _value) + __privateGet(this, _step) <= __privateGet(this, _max);
  }
  /**
   * Check whether current value reached the minimum value taking into account a step
   */
  hasPrevious() {
    return __privateGet(this, _value) - __privateGet(this, _step) >= __privateGet(this, _min);
  }
  /**
   * Get current value
   *
   * @returns current value
   */
  get value() {
    return __privateGet(this, _value);
  }
  ensureInRange(value) {
    if (value > __privateGet(this, _max) && value < __privateGet(this, _min)) {
      throw new Error(`value must be in [${__privateGet(this, _min)}..${__privateGet(this, _max)}]`);
    }
  }
};
_min = new WeakMap();
_max = new WeakMap();
_value = new WeakMap();
_step = new WeakMap();
var src_default = RangeStepper;
export {
  src_default as default
};
