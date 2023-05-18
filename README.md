# range-stepper [![NPM version][npm-image]][npm-url]

> Build a range with current value and a step and use methods to get previous or next value

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

## License

MIT © [Rushan Alyautdinov](https://github.com/akgondber)

[npm-image]: https://img.shields.io/npm/v/range-stepper.svg?style=flat
[npm-url]: https://npmjs.org/package/range-stepper
