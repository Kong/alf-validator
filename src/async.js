import { default as schemas, latest } from './versions'
import ALFError from './error'
import JSONValidator from 'is-my-json-valid'

// create an alias
schemas.latest = schemas[latest]

export default function validator (data = {}, options = { version: 'latest', additionalProperties: false }, cb) {
  // default value
  let valid = false
  let type = Array.isArray(data) ? 'multi' : 'single'
  let schema = schemas[options.version || 'latest'][type]

  // should we filter the data first ?
  if (options.additionalProperties === true) {
    let filter = JSONValidator.filter(schema)
    data = filter(data)
  }

  // validator config
  let validate = JSONValidator(schema, {
    greedy: true,
    verbose: true
  })

  // execute is-my-json-valid
  valid = validate(data)

  // callback?
  if (typeof cb === 'function') {
    return cb(validate.errors ? new ALFError(validate.errors) : null, data)
  }

  return valid
}
