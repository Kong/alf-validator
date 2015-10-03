'use strict'

var latest = '1.0.0'
var Promise = require('pinkie-promise')
var runner = require('./runner')
var schemas = require('./schemas')

// create an alias
schemas.latest = schemas[latest]

// promisify method
var promisify = function (type) {
  return function (data, options) {
    var opts = options || {}

    var schema = schemas[opts.version || latest][type]

    return new Promise(function (resolve, reject) {
      runner(schema, data, function (err, valid) {
        return err === null ? resolve(data) : reject(err)
      })
    })
  }
}

module.exports = promisify('single')
module.exports.single = promisify('single')
module.exports.multi = promisify('multi')
