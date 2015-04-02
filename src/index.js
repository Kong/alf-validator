'use strict'

var schema = require('./schema')
var validator = require('is-my-json-valid')
var ValidationError = require('har-validator/src/error')

module.exports = function (data, cb) {
  var validate = validator(schema, {
    greedy: true,
    verbose: true
  })

  var valid = false

  if (data !== undefined) {
    // execute is-my-json-valid
    valid = validate(data)
  }

  // callback?
  if (!cb) {
    return validate.errors ? false : true
  } else {
    return cb(validate.errors ? new ValidationError(validate.errors) : null, valid)
  }

  return valid
}
