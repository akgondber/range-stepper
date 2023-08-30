# range-stepper [![NPM version][npm-image]][npm-url]

> Build a range with current value and a step and use convenient api to manipulate with a pointer

This package can be useful for cycling through tabs, index based apps and games, slides, etc. Instead of defining and checking indexes you can instantiate this class and use convenience api.

## Installation

```sh
$ npm install range-stepper
```

or

```sh
$ yarn add range-stepper
```

## Usage

```javascript
import RangeStepper from "range-stepper";

const stepper = new RangeStepper({ max: 16 });
stepper.next();
console.log(stepper.value); // 1

stepper.next();
console.log(stepper.value); // 2

stepper.next();
console.log(stepper.value); // 3

stepper.previous();
console.log(stepper.value); // 2
```

## Features

```javascript
const stepper = new RangeStepper({ max: 16 });
stepper.next();
console.log(stepper.value); // 1

console.log(stepper.isCurrent(1)); // true
console.log(stepper.isCurrent(5)); // false

console.log(stepper.setValue(6));
console.log(stepper.value); // 7

console.log(stepper.hasNext()); // true
console.log(stepper.setValue(16));
console.log(stepper.hasNext()); // false

console.log(stepper.setValue(5));
console.log(stepper.hasPrevious()); // true
console.log(stepper.setValue(0));
console.log(stepper.hasPrevious()); // false

console.log(stepper.setValue(16));
// uses cyclical approach
// when max is reached
// `next()` method moves a current pointer to the min value
stepper.next();
console.log(stepper.value); // 0

console.log(stepper.setValue(0));
// when current value equals to min value
// `previous()` method moves a current pointer to the max value
stepper.previous();
console.log(stepper.value); // 16

// in order to move a pointer to start value
// you can use the `first()` method
stepper.first();
console.log(stepper.value); // 0

// in order to move a pointer to start value
// you can use the `last()` method
stepper.last();
console.log(stepper.value); // 16

const obj = stepper.asObject(); // get an object representation
const clonedInstance = stepper.clone(); // get a clone
const dupInstance = stepper.dup(); // `dup` is an alias for the `clone` method
```

## License

MIT © [Rushan Alyautdinov](https://github.com/akgondber)

[npm-image]: https://img.shields.io/npm/v/range-stepper.svg?style=flat
[npm-url]: https://npmjs.org/package/range-stepper
