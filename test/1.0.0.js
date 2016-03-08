import ALFError from '../src/error'
import fixtures from './fixtures/'
import tap from 'tap'
import validate from '../src/promise'

const fixture = fixtures['1.0.0']
const errors = {
  object: new ALFError([{ field: 'data.version', message: 'is required' }, { field: 'data.serviceToken', message: 'is required' }, { field: 'data.har', message: 'is required' }]),
  array: new ALFError([{ field: 'data', message: 'has less items than allowed' }]),
  undef: new ALFError([{ field: 'data.version', message: 'is required' }]),
  creator: new ALFError([{ field: 'data.har.log.creator.version', message: 'is required' }]),
  version: new ALFError([{ field: 'data.har.log.version', message: 'is the wrong type' }]),
  multi: new ALFError([{ field: 'data.1.version', message: 'is required' }])
}

tap.test('v1.0.0', (t) => {
  t.test('failure', (assert) => {
    assert.plan(6)

    return Promise.all([
      validate({}, '1.0.0').catch((err) => assert.match(err, errors.object, 'should fail with empty object')),
      validate([], '1.0.0').catch((err) => assert.match(err, errors.array, 'should fail with empty array')),
      validate(undefined, '1.0.0').catch((err) => assert.match(err, errors.undef, 'should fail with undefined')),
      validate(fixture.invalid.creator, '1.0.0').catch((err) => assert.match(err, errors.creator, 'should fail on bad "log.creator"')),
      validate(fixture.invalid.version, '1.0.0').catch((err) => assert.match(err, errors.version, 'should fail on bad "log.version"')),
      validate(fixture.invalid.multi, '1.0.0').catch((err) => assert.match(err, errors.multi, 'should fail on multi with one corrupt'))
    ])
  })

  t.test('success', (assert) => {
    assert.plan(3)

    return Promise.all([
      validate(fixture.full, '1.0.0').then((out) => assert.equal(out, fixture.full, 'should validate successfully with full example')),
      validate(fixture.minimal, '1.0.0').then((out) => assert.equal(out, fixture.minimal, 'should validate successfully with minimally required example')),
      validate(fixture.multi, '1.0.0').then((out) => assert.equal(out, fixture.multi, 'should succeed on multi ALF'))
    ])
  })

  .then(t.end)
})
