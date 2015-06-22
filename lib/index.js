'use strict'

var latest = '1.0.0'
var schema = require('./schema')
var validator = require('is-my-json-valid')
var ValidationError = require('har-validator/lib/error')

// create alias
schema.latest = schema[latest]

// validation function
function validate (type) {
  return function (data, options, cb) {
    var opts = options || {}

    var validate = validator(schema[opts.version || latest][type], {
      greedy: true,
      verbose: true
    })

    var valid = false

    if (data !== undefined) {
      // execute is-my-json-valid
      valid = validate(data)
    }

    // callback?
    if (typeof cb === 'function') {
      return cb(validate.errors ? new ValidationError(validate.errors) : null, valid)
    }

    return valid
  }
}

module.exports = validate('single')
module.exports.single = validate('single')
module.exports.multi = validate('multi')

module.exports.schema = function (version) {
  return schema[version]
}
