# ALF Validator [![version][npm-version]][npm-url] [![License][npm-license]][license-url]

Extremely fast API Log Format (ALF) validator using JSON Schema.

[![Build Status][travis-image]][travis-url]
[![Downloads][npm-downloads]][npm-url]
[![Dependencies][david-image]][david-url]


## Table of contents
- [Installation](#installation) 
- [Usage](#usage) 
- [License](#license)

## Installation

install from source or through [npm](https://www.npmjs.com/):

```shell
npm install --global alf-validator
```

## Usage

###### CLI

```shell
alf-validator ./path/to/file.log
```

###### Code

```js
var validate = require('alf-validator');

validate(HAR, function (err, valid) {
  if (err) console.log(err)

  if (valid) {
    console.log('horray!');
  }
});
```

## License

Licensed under [The MIT License](LICENSE).

[license-url]: https://github.com/ahmadnassri/alf-validator/blob/master/LICENSE

[travis-url]: https://travis-ci.org/ahmadnassri/alf-validator
[travis-image]: https://img.shields.io/travis/ahmadnassri/alf-validator.svg?style=flat-square

[npm-url]: https://www.npmjs.com/package/alf-validator
[npm-license]: https://img.shields.io/npm/l/alf-validator.svg?style=flat-square
[npm-version]: https://img.shields.io/npm/v/alf-validator.svg?style=flat-square
[npm-downloads]: https://img.shields.io/npm/dm/alf-validator.svg?style=flat-square

[david-url]: https://david-dm.org/ahmadnassri/alf-validator
[david-image]: https://img.shields.io/david/ahmadnassri/alf-validator.svg?style=flat-square
