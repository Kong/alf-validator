## Promise API

###### Import

```js
// default, ES5 (pre-compiled)
import validate from 'alf-validator/lib/promise'

// ES2015 (srouce)
import validate from 'alf-validator/src/promise'
```

###### Require

```js
// default, ES5 (pre-compiled)
var validate = require('alf-validator/lib/promise')
```

### validate(data [, version = 'latest'] [, additionalProperties = false])

> Returns a Promise

- **data**: `Object` *(Required)*
  an [ALF](https://github.com/Mashape/api-log-format) object

- **version**: `String`
  [ALF](https://github.com/Mashape/api-log-format#versions) schema version number

- **additionalProperties**: `Boolean`
  filters away properties not in the schema before attempt to validate

```js
validate(data, 'latest', false)
  .then((data) => console.log('horray!'))
  .catch(console.error)
```

> the promise resolves with an object representing the filtered data *(if `additionalProperties === true`)* or the original data
