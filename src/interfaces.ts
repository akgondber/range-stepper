export interface StepperConfig {
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
  /**
   * Whether to use single value support (min and max have equal value)
   */
  single?: boolean;
}
