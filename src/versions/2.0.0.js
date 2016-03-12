import cache from '../../schemas/2.0.0/cache.json'
import cacheEntry from '../../schemas/2.0.0/cacheEntry.json'
import content from '../../schemas/2.0.0/content.json'
import cookie from '../../schemas/2.0.0/cookie.json'
import creator from '../../schemas/2.0.0/creator.json'
import entry from '../../schemas/2.0.0/entry.json'
import har from '../../schemas/2.0.0/har.json'
import log from '../../schemas/2.0.0/log.json'
import page from '../../schemas/2.0.0/page.json'
import pageTimings from '../../schemas/2.0.0/pageTimings.json'
import postData from '../../schemas/2.0.0/postData.json'
import record from '../../schemas/2.0.0/record.json'
import request from '../../schemas/2.0.0/request.json'
import response from '../../schemas/2.0.0/response.json'
import timings from '../../schemas/2.0.0/timings.json'

/*
 * copy external scheams internally
 * is-my-json-valid does not provide meaningful error messages for external schemas
 */

cache.properties.beforeRequest = cacheEntry
cache.properties.afterRequest = cacheEntry

page.properties.pageTimings = pageTimings

request.properties.cookies.items = cookie
request.properties.headers.items = record
request.properties.queryString.items = record
request.properties.postData = postData

response.properties.cookies.items = cookie
response.properties.headers.items = record
response.properties.content = content

entry.properties.request = request
entry.properties.response = response
entry.properties.cache = cache
entry.properties.timings = timings

log.properties.creator = creator
log.properties.browser = creator
log.properties.pages.items = page
log.properties.entries.items = entry

har.properties.log = log

// ALF Properties
const schema = {
  type: 'object',
  required: ['version', 'serviceToken', 'har'],
  additionalProperties: false,
  properties: {
    har: har,
    environment: 'string',
    serviceToken: 'string',
    version: {
      type: 'string',
      enum: ['2.0.0']
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
  items: schema,
  additionalProperties: false
}
