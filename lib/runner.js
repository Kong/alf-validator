'use strict'

var ValidationError = require('har-validator/lib/error')
var validator = require('is-my-json-valid')

module.exports = function (schema, data, cb) {
  // default values
  var valid = false

  // validator config
  var validate = validator(schema, {
    greedy: true,
    verbose: true
  })

  // execute is-my-json-valid
  if (data !== undefined) {
    valid = validate(data)
  }

  // callback?
  if (typeof cb === 'function') {
    return cb(validate.errors ? new ValidationError(validate.errors) : null, valid)
  }

  return valid
}
