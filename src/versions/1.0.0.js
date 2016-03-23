import clone from 'stringify-clone'
import { har } from 'har-validator/lib/schemas'

// ALF Properties
const schema = {
  type: 'object',
  required: ['version', 'serviceToken', 'har'],
  properties: {
    har: clone(har),
    environment: 'string',
    serviceToken: 'string',
    version: {
      type: 'string',
      enum: ['1.0.0']
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

export const single = schema
export const multi = {
  type: 'array',
  minItems: 1,
  items: schema
}
