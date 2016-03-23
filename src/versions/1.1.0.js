import clone from 'stringify-clone'
import _content from '../../schemas/1.1.0/content.json'
import _creator from '../../schemas/1.1.0/creator.json'
import _entry from '../../schemas/1.1.0/entry.json'
import _log from '../../schemas/1.1.0/log.json'
import _pairs from '../../schemas/1.1.0/pairs.json'
import _request from '../../schemas/1.1.0/request.json'
import _response from '../../schemas/1.1.0/response.json'
import _timings from '../../schemas/1.1.0/timings.json'

let content = clone(_content)
let creator = clone(_creator)
let entry = clone(_entry)
let log = clone(_log)
let pairs = clone(_pairs)
let request = clone(_request)
let response = clone(_response)
let timings = clone(_timings)

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
