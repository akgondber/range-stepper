interface StepperConfig {
    /**
     * minimum value
     */
    min?: number;
    /**
     *  maximum value
     */
    max: number;
    /**
     * step to be used when computing the previous or next value
     */
    step?: number;
    /**
     * current value
     */
    current?: number;
}

declare class RangeStepper {
    #private;
    /**
     *
     * Creates a new stepper object
     * @param min - minimum value
     * @param max - maximum value
     * @param step - step to be used when moving to next or previous position
     * @params current - current value (default is min value)
     */
    constructor({ min, max, step, current }: StepperConfig);
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
    next(): this;
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
    previous(): this;
    /**
     * Sets a new current value
     * @param newValue - new current value
     *
     * @throws {Error} if provided value outside of range [min..max]
     */
    setValue(newValue: number): void;
    /**
     * Check whether current value reached the maximum value taking into account a step
     */
    hasNext(): boolean;
    /**
     * Check whether current value reached the minimum value taking into account a step
     */
    hasPrevious(): boolean;
    /**
     * Get current value
     *
     * @returns current value
     */
    get value(): number;
    private ensureInRange;
}

export { StepperConfig, RangeStepper as default };
