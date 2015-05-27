# ALF Validator [![version][npm-version]][npm-url] [![License][npm-license]][license-url]

Extremely fast API Log Format ([ALF](https://github.com/Mashape/api-log-format)) validator using JSON Schema.

[![Build Status][travis-image]][travis-url]
[![Downloads][npm-downloads]][npm-url]
[![Code Climate][codeclimate-quality]][codeclimate-url]
[![Coverage Status][codeclimate-coverage]][codeclimate-url]
[![Dependencies][david-image]][david-url]

## Install

```sh
npm install --save alf-validator
```

## Usage

```

  Usage: alf-validator [options] <files ...>

  Options:

    -h, --help              output usage information
    -V, --version           output the version number
    -s, --schema [version]  validate using specific schema version (default to latest)

```


###### Example

## CLI 

```shell
alf-validator alf.json
```

## API

### Validate(data [, options, callback])

alias of `validate.single()`

### Validate.single(data [, options, callback])

Returns `true` or `false`.

- **data**: `Object` *(Required)*
  a full [ALF](https://github.com/Mashape/api-log-format) object

- **options**: `Object`
  Options Object

- **callback**: `Function`
  gets two arguments (err, valid)

```js
var ALF = require('./alf.json')
var validate = require('alf-validator')
var options = {
  version: '1.0.0'
}

validate(ALF, options, function (e, valid) {
  if (e) console.log(e.errors)

  if (valid) console.log('horray!')
})
```

#### Options

| Name      | Description                        | Default    |
| --------- | ---------------------------------- | ---------- |
| `version` | Schema version to validate against | `'latest'` |


### Validate.multi(data [, options, callback])

Returns `true` or `false`.

- **data**: `Array` *(Required)*
  an array of [ALF](https://github.com/Mashape/api-log-format) objects

- **options**: `Object`
  Options Object

- **callback**: `Function`
  gets two arguments (err, valid)

```js
var ALFArray = require('./alf.json')
var validate = require('alf-validator')
var options = {
  version: '1.0.0'
}

validate(ALFArray, options, function (e, valid) {
  if (e) console.log(e.errors)

  if (valid) console.log('horray!')
})
```

#### Options

| Name      | Description                        | Default    |
| --------- | ---------------------------------- | ---------- |
| `version` | Schema version to validate against | `'latest'` |


### Validate.schema(version)

Returns the JSON Schema object

- **version**: `String` *(Required)*
  [ALF Schema](https://github.com/Mashape/api-log-format) version

```js
var validate = require('alf-validator')

validate.schema('1.0.0')
```

## License

[MIT](LICENSE) &copy; [Mashape](https://www.mashape.com/)

[license-url]: https://github.com/Mashape/alf-validator/blob/master/LICENSE

[travis-url]: https://travis-ci.org/Mashape/alf-validator
[travis-image]: https://img.shields.io/travis/Mashape/alf-validator.svg?style=flat-square

[npm-url]: https://www.npmjs.com/package/alf-validator
[npm-license]: https://img.shields.io/npm/l/alf-validator.svg?style=flat-square
[npm-version]: https://img.shields.io/npm/v/alf-validator.svg?style=flat-square
[npm-downloads]: https://img.shields.io/npm/dm/alf-validator.svg?style=flat-square

[codeclimate-url]: https://codeclimate.com/github/Mashape/alf-validator
[codeclimate-quality]: https://img.shields.io/codeclimate/github/Mashape/alf-validator.svg?style=flat-square
[codeclimate-coverage]: https://img.shields.io/codeclimate/coverage/github/Mashape/alf-validator.svg?style=flat-square

[david-url]: https://david-dm.org/Mashape/alf-validator
[david-image]: https://img.shields.io/david/Mashape/alf-validator.svg?style=flat-square
