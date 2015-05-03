'use strict'

var clone = require('stringify-clone')
var schemas = clone(require('har-validator/src/schemas'))

// ALF Properties
var schema = {
  type: 'object',
  required: ['version', 'serviceToken', 'har'],
  properties: {
    har: schemas.har,
    environment: 'string',
    serviceToken: 'string',
    version: {
      type: 'string',
      pattern: '^1\.0\.0$'
    },
    clientIPAddress: {
      type: 'string',
      format: 'ipv4'
    }
  }
}

module.exports = schema
