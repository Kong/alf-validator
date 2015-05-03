'use strict'

var clone = require('stringify-clone')
var schemas = clone(require('har-validator/src/schemas'))

// ALF modification to HAR

// ignore `cache`
schemas.har.properties.log.properties.entries.items.required = [
    'startedDateTime',
    'time',
    'request',
    'response',
    'timings'
]

// ignore `cookies
schemas.har.properties.log.properties.entries.items.properties.request.required = [
  'method',
  'url',
  'httpVersion',
  'headers',
  'queryString',
  'headersSize',
  'bodySize'
]

// ignore `cookies`, `redirectURL`
schemas.har.properties.log.properties.entries.items.properties.response.required = [
    'status',
    'statusText',
    'httpVersion',
    'headers',
    'content',
    'headersSize',
    'bodySize'
]

// add entry.clientIPAddress
schemas.har.properties.log.properties.entries.items.clientIPAddress = {
  type: 'string',
  format: 'ipv4'
}

// add request.content
schemas.har.properties.log.properties.entries.items.properties.request.properties.content = schemas.content

// ALF Properties
var schema = {
  type: 'object',
  required: ['serviceToken', 'har'],
  properties: {
    har: schemas.har,
    environment: 'string',
    serviceToken: 'string',
    version: {
      type: 'string',
      pattern: '^0\\.0\\.1$'
    }
  }
}

var multi = {
  type: 'array',
  minItems: 1,
  items: schema
}

module.exports = {
  single: schema,
  multi: multi
}
