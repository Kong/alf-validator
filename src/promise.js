import { default as schemas, latest } from './versions'
import ALFError from './error'
import JSONValidator from 'is-my-json-valid'

// create an alias
schemas.latest = schemas[latest]

export default function validator (data = {}, version = 'latest') {
  return new Promise((resolve, reject) => {
    let type = Array.isArray(data) ? 'multi' : 'single'

    let schema = schemas[version][type]

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
