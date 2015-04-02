'use strict'

var schemas = require('har-validator/src/schemas')

// ALF modification to HAR

schemas.har.properties.log.properties.entries.items.required = [
  'startedDateTime',
  'time',
  'request',
  'response',
  'timings'
]

schemas.har.properties.log.properties.entries.items.properties.request.required = [
  'method',
  'url',
  'httpVersion',
  'headers',
  'queryString',
  'headersSize',
  'bodySize'
]

schemas.har.properties.log.properties.entries.items.properties.response.required = [
  'status',
  'statusText',
  'httpVersion',
  'headers',
  'content',
  'headersSize',
  'bodySize'
]

schemas.har.properties.log.properties.entries.items.properties.serverIPAddress = { 'type': 'string', 'format': 'ipv4' }
schemas.har.properties.log.properties.entries.items.properties.clientIPAddress = { 'type': 'string', 'format': 'ipv4' }

var schema = {
  type: 'object',
  required: ['serviceToken', 'har'],
  properties: {
    serviceToken: 'string',
    har: schemas.har
  }
}

module.exports = schema
