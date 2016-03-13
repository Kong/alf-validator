import * as fixtures from './fixtures/1.0.0/'
import ALFError from '../src/error'
import tap from 'tap'
import validate from '../src/async'

const options = {
  version: '1.0.0',
  additionalProperties: false
}

tap.test('async', (t) => {
  t.test('failure', (assert) => {
    assert.plan(4)

    let error = new ALFError([{ field: 'data.version', message: 'is required' }])

    assert.notOk(validate({}), 'should fail')

    validate({}, options, (err, valid) => {
      assert.notOk(valid, 'should return false in a callback')
      assert.type(err, ALFError, 'should return ALFError object in a callback')
    })

    validate({}, options, (err) => assert.match(err, error, 'should fail on missing "data.version"'))
  })

  t.test('success', (assert) => {
    assert.plan(4)

    assert.ok(validate(fixtures.full, options), 'should successfully validate single ALF object')
    assert.ok(validate([fixtures.full], options), 'should successfully validate multiple ALF objects')

    validate(fixtures.full, options, (err, valid) => {
      assert.ok(valid, 'should return true in a callback')
      assert.equal(err, null, 'should not have any errors')
    })
  })

  t.end()
})
