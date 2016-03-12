import { har, content } from 'har-validator/lib/schemas'

// ALF modification to HAR

// ignore `cache`
har.properties.log.properties.entries.items.required = [
  'startedDateTime',
  'time',
  'request',
  'response',
  'timings'
]

// ignore `cookies
har.properties.log.properties.entries.items.properties.request.required = [
  'method',
  'url',
  'httpVersion',
  'headers',
  'queryString',
  'headersSize',
  'bodySize'
]

// ignore `cookies`, `redirectURL`
har.properties.log.properties.entries.items.properties.response.required = [
  'status',
  'statusText',
  'httpVersion',
  'headers',
  'content',
  'headersSize',
  'bodySize'
]

// add entry.clientIPAddress
har.properties.log.properties.entries.items.clientIPAddress = {
  type: 'string',
  format: 'ipv4',
  oneOf: [
    { format: 'ipv4' },
    { format: 'ipv6' }
  ]
}

// add request.content
har.properties.log.properties.entries.items.properties.request.properties.content = content

// ALF Properties
const schema = {
  type: 'object',
  required: ['serviceToken', 'har'],
  properties: {
    har: har,
    environment: 'string',
    serviceToken: 'string',
    version: {
      type: 'string',
      enum: ['0.0.1']
    }
  }
}

export const single = schema
export const multi = {
  type: 'array',
  minItems: 1,
  items: schema
}
