import content from '../../schemas/1.1.0/content.json'
import creator from '../../schemas/1.1.0/creator.json'
import entry from '../../schemas/1.1.0/entry.json'
import log from '../../schemas/1.1.0/log.json'
import pairs from '../../schemas/1.1.0/pairs.json'
import request from '../../schemas/1.1.0/request.json'
import response from '../../schemas/1.1.0/response.json'
import timings from '../../schemas/1.1.0/timings.json'

/*
 * copy external scheams internally
 * is-my-json-valid does not provide meaningful error messages for external schemas
 */

request.properties.headers.items = pairs
request.properties.queryString.items = pairs
request.properties.postData = content

response.properties.headers.items = pairs
response.properties.content = content

entry.properties.request = request
entry.properties.response = response
entry.properties.timings = timings

log.properties.har.properties.log.creator = creator
log.properties.har.properties.log.properties.entries.items = entry

export const single = log
export const multi = {
  type: 'array',
  minItems: 1,
  items: log,
  additionalProperties: false
}
