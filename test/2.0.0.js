import * as fixtures from './fixtures/2.0.0/'
import ALFError from '../src/error'
import tap from 'tap'
import validate from '../src/promise'

const errors = {
  object: new ALFError([{ field: 'data.version', message: 'is required' }, { field: 'data.creator', message: 'is required' }, { field: 'data.entries', message: 'is required' }]),
  array: new ALFError([{ field: 'data', message: 'has less items than allowed' }]),
  undef: new ALFError([{ field: 'data.version', message: 'is required' }]),
  service: new ALFError([{ field: 'data.service.token', message: 'is required' }]),
  bodysize: new ALFError([{ field: 'data.entries.0.request.bodySize', message: 'is less than minimum' }, { field: 'data.entries.0.response.bodySize', message: 'is less than minimum' }]),
  properties: new ALFError([{ field: 'data', message: 'has additional properties' }, { field: 'data.entries.0.request', message: 'has additional properties' }])
}

tap.test('v2.0.0', (t) => {
  t.test('failure', (assert) => {
    assert.plan(6)

    return Promise.all([
      validate({}, '2.0.0').catch((err) => assert.match(err, errors.object, 'should fail with empty object')),
      validate([], '2.0.0').catch((err) => assert.match(err, errors.array, 'should fail with empty array')),
      validate(undefined, '2.0.0').catch((err) => assert.match(err, errors.undef, 'should fail with undefined')),
      validate(fixtures.invalid.service, '2.0.0').catch((err) => assert.match(err, errors.service, 'should fail on bad "log.service"')),
      validate(fixtures.invalid.bodysize, '2.0.0').catch((err) => assert.match(err, errors.bodysize, 'should fail with bad "bodysize"')),
      validate(fixtures.invalid.properties, '2.0.0').catch((err) => assert.match(err, errors.properties, 'should fail with additional properties"'))
    ])
  })

  t.test('success', (assert) => {
    assert.plan(4)

    return Promise.all([
      validate(fixtures.full, '2.0.0').then((out) => assert.equal(out, fixtures.full, 'should validate successfully with full example')),
      validate(fixtures.minimal, '2.0.0').catch(console.error).then((out) => assert.equal(out, fixtures.minimal, 'should validate successfully with minimally required example')),
      validate(fixtures.multi, '2.0.0').then((out) => assert.equal(out, fixtures.multi, 'should succeed on multi ALF')),
      validate(fixtures.invalid.properties, '2.0.0', true).then((out) => assert.match(out, fixtures.minimal, 'should filter away additional properties'))
    ])
  })

  .then(t.end)
})
