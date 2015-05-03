'use strict'

var latest = '1.0.0'
var schema = require('./schema')
var validator = require('is-my-json-valid')
var ValidationError = require('har-validator/src/error')

// create alias
schema.latest = schema[latest]

// main module
module.exports = function (data, options, cb) {
  var opts = options || {}

  var validate = validator(schema[opts.version || latest], {
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

module.exports.schema = schema
