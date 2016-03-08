# ALF Validator [![version][npm-version]][npm-url] [![License][npm-license]][license-url]

Extremely fast API Log Format ([ALF](https://github.com/Mashape/api-log-format)) validator using JSON Schema.

[![Build Status][travis-image]][travis-url]
[![Downloads][npm-downloads]][npm-url]
[![Code Climate][codeclimate-quality]][codeclimate-url]
[![Coverage Status][codeclimate-coverage]][codeclimate-url]
[![Dependencies][david-image]][david-url]

## Install

```bash
# to use in cli
npm install --global alf-validator

# to use as a module
npm install --save alf-validator
```

## CLI Usage

```

  Usage: alf-validator [options] <files ...>

  Options:

    -h, --help              output usage information
    -V, --version           output the version number
    -s, --schema [version]  validate using specific schema version (default to latest)

```

###### Example

```shell
alf-validator alf.json

alf-validator --schema 1.0.0 alf.json
```

## API 

- [async API](docs/async.md)
- [callback API](docs/async.md)
- [Promise API](docs/promise.md) *(default)*

----
> :copyright: [www.mashape.com](https://www.mashape.com/) &nbsp;&middot;&nbsp;
> License: [ISC](LICENSE) &nbsp;&middot;&nbsp;
> Github: [@mashape](https://github.com/mashape) &nbsp;&middot;&nbsp;
> Twitter: [@mashape](https://twitter.com/mashape)

[license-url]: http://choosealicense.com/licenses/mit/

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
