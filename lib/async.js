'use strict'

var latest = '1.0.0'
var runner = require('./runner')
var schemas = require('./schemas')

// create an alias
schemas.latest = schemas[latest]

// runner
var validator = function (type) {
  return function (data, options, callback) {
    var opts = options || {}

    var schema = schemas[opts.version || latest][type]

    return runner(schema, data, callback)
  }
}

module.exports = validator('single')
module.exports.single = validator('single')
module.exports.multi = validator('multi')
