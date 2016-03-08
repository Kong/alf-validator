import schemas from './schemas'
import ALFError from './error'
import JSONValidator from 'is-my-json-valid'

const latest = '1.0.0'

// create an alias
schemas.latest = schemas[latest]

export default function validator (data = {}, version = 'latest', cb) {
  // default value
  let valid = false

  let type = Array.isArray(data) ? 'multi' : 'single'

  let schema = schemas[version][type]

  // validator config
  let validate = JSONValidator(schema, {
    greedy: true,
    verbose: true
  })

  // execute is-my-json-valid
  valid = validate(data)

  // callback?
  if (typeof cb === 'function') {
    return cb(validate.errors ? new ALFError(validate.errors) : null, valid)
  }

  return valid
}
