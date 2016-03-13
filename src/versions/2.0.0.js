import content from '../../schemas/2.0.0/content.json'
import creator from '../../schemas/2.0.0/creator.json'
import entry from '../../schemas/2.0.0/entry.json'
import log from '../../schemas/2.0.0/log.json'
import pairs from '../../schemas/2.0.0/pairs.json'
import request from '../../schemas/2.0.0/request.json'
import response from '../../schemas/2.0.0/response.json'
import service from '../../schemas/2.0.0/service.json'
import timings from '../../schemas/2.0.0/timings.json'

/*
 * copy external scheams internally
 * is-my-json-valid does not provide meaningful error messages for external schemas
 */

request.properties.headers.items = pairs
request.properties.queryString.items = pairs
request.properties.content = content

response.properties.headers.items = pairs
response.properties.content = content

entry.properties.request = request
entry.properties.response = response
entry.properties.timings = timings

log.properties.creator = creator
log.properties.service = service
log.properties.entries.items = entry

export const single = log
export const multi = {
  type: 'array',
  minItems: 1,
  items: log,
  additionalProperties: false
}
