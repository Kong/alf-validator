## Callback API

###### Import

```js
// default, ES5 (pre-compiled)
import validate from 'alf-validator/lib/async'

// ES2015 (srouce)
import validate from 'alf-validator/src/async'
```

###### Require

```js
// default, ES5 (pre-compiled)
var validate = require('alf-validator/lib/async')
```

### validate(data [, version = 'latest'] [, additionalProperties = false] [, callback])

> Returns `true` or `false`.

- **data**: `Object` *(Required)*
  an [ALF](https://github.com/Mashape/api-log-format) object

- **version**: `String`
  [ALF](https://github.com/Mashape/api-log-format#versions) schema version number

- **additionalProperties**: `Boolean`
  filters away properties not in the schema before attempt to validate

- **callback**: `Function`
  callback function with signature of `(err, valid)`

```js
let isValid = validate(data, '0.0.1', (err, valid) => {
  if (err) console.error(e.errors)

  if (valid) console.log('horray!')
})
```
