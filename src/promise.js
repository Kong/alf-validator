import { default as schemas, latest } from './versions'
import ALFError from './error'
import JSONValidator from 'is-my-json-valid'

// create an alias
schemas.latest = schemas[latest]

export default function validator (data = {}, version = 'latest', additionalProperties = false) {
  let type = Array.isArray(data) ? 'multi' : 'single'
  let schema = schemas[version][type]

  // should we filter the data first ?
  if (additionalProperties === true) {
    let filter = JSONValidator.filter(schema)
    data = filter(data)
  }

  return new Promise((resolve, reject) => {
    // validator config
    let validate = JSONValidator(schema, {
      greedy: true,
      verbose: true
    })

    // execute is-my-json-valid
    validate(data)

    validate.errors ? reject(new ALFError(validate.errors)) : resolve(data)
  })
}
