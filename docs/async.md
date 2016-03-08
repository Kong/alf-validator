## async API

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

### validate(data [, version = 'latest'])

> Returns `true` or `false`.

- **data**: `Object` *(Required)*
  an [ALF](https://github.com/Mashape/api-log-format) object

- **version**: `String`
  [ALF](https://github.com/Mashape/api-log-format#versions) schema version number

```js
let isValid = validate(data, '1.0.0')
```
