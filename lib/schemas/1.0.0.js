'use strict'

var clone = require('stringify-clone')
var schemas = clone(require('har-validator/lib/schemas'))

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
      pattern: '^1\\.0\\.0$'
    },
    clientIPAddress: {
      type: 'string',
      oneOf: [
        { format: 'ipv4' },
        { format: 'ipv6' }
      ]
    }
  }
}

module.exports = {
  single: schema,
  multi: {
    type: 'array',
    minItems: 1,
    items: schema
  }
}
