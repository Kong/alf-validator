import tap from 'tap'

import srcAsync from '../src/async'
import srcPromise from '../src/promise'

const libAsync = require('../lib/async')
const libPromise = require('../lib/promise')

tap.test('modules', (t) => {
  t.test('Common.JS', (assert) => {
    assert.plan(2)

    assert.type(libPromise(), Promise, 'default import is a promise')
    assert.type(libAsync(), 'boolean', 'default import is a function')
  })

  t.test('ES2015', (assert) => {
    assert.plan(2)

    assert.type(srcPromise(), Promise, 'default import is a promise')
    assert.type(srcAsync(), 'boolean', 'default import is a function')
  })

  t.end()
})
