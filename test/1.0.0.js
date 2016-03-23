import * as fixtures from './fixtures/1.0.0/'
import ALFError from '../src/error'
import tap from 'tap'
import validate from '../src/promise'

const errors = {
  object: new ALFError([{ field: 'data.version', message: 'is required' }, { field: 'data.serviceToken', message: 'is required' }, { field: 'data.har', message: 'is required' }]),
  array: new ALFError([{ field: 'data', message: 'has less items than allowed' }]),
  undef: new ALFError([{ field: 'data.version', message: 'is required' }]),
  creator: new ALFError([{ field: 'data.har.log.creator.version', message: 'is required' }]),
  version: new ALFError([{ field: 'data.har.log.version', message: 'is the wrong type' }]),
  multi: new ALFError([{ field: 'data.1.version', message: 'is required' }]),
  deep: new ALFError([
    { field: 'data.version', message: 'is required', type: 'object' },
    { field: 'data.har.log.entries.0.cache', message: 'is required', type: 'object' },
    { field: 'data.har.log.entries.0.startedDateTime', message: 'pattern mismatch', value: '2015-03-30 22:38:01.362855Z', type: 'string' },
    { field: 'data.har.log.entries.0.request.cookies', message: 'is required', type: 'object' },
    { field: 'data.har.log.entries.0.response.cookies', message: 'is required', type: 'object' },
    { field: 'data.har.log.entries.0.response.redirectURL', message: 'is required', type: 'object' },
    { field: 'data.har.log.entries.0.serverIPAddress', message: 'is the wrong type', value: 1563782, type: 'string' }
  ])
}

tap.test('v1.0.0', (t) => {
  t.test('failure', (assert) => {
    assert.plan(7)

    return Promise.all([
      validate({}, '1.0.0').catch((err) => assert.match(err, errors.object, 'should fail with empty object')),
      validate([], '1.0.0').catch((err) => assert.match(err, errors.array, 'should fail with empty array')),
      validate(undefined, '1.0.0').catch((err) => assert.match(err, errors.undef, 'should fail with undefined')),
      validate(fixtures.invalid.creator, '1.0.0').catch((err) => assert.match(err, errors.creator, 'should fail on bad "log.creator"')),
      validate(fixtures.invalid.version, '1.0.0').catch((err) => assert.match(err, errors.version, 'should fail on bad "log.version"')),
      validate(fixtures.invalid.multi, '1.0.0').catch((err) => assert.match(err, errors.multi, 'should fail on multi with one corrupt')),
      validate(fixtures.invalid.deep, '1.0.0').catch((err) => assert.match(err, errors.deep, 'should fail on multi with one corrupt'))
    ])
  })

  t.test('success', (assert) => {
    assert.plan(3)

    return Promise.all([
      validate(fixtures.full, '1.0.0').then((out) => assert.equal(out, fixtures.full, 'should validate successfully with full example')),
      validate(fixtures.minimal, '1.0.0').then((out) => assert.equal(out, fixtures.minimal, 'should validate successfully with minimally required example')),
      validate(fixtures.multi, '1.0.0').then((out) => assert.equal(out, fixtures.multi, 'should succeed on multi ALF'))
    ])
  })

  .then(t.end)
})
