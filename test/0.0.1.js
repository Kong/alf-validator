import * as fixtures from './fixtures/0.0.1/'
import ALFError from '../src/error'
import tap from 'tap'
import validate from '../src/promise'

const errors = {
  object: new ALFError([{ field: 'data.serviceToken', message: 'is required' }, { field: 'data.har', message: 'is required' }]),
  array: new ALFError([{ field: 'data', message: 'has less items than allowed' }]),
  undef: new ALFError([{ field: 'data.serviceToken', message: 'is required' }]),
  token: new ALFError([{ field: 'data.serviceToken', message: 'is required' }]),
  creator: new ALFError([{ field: 'data.har.log.creator.version', message: 'is required' }]),
  version: new ALFError([{ field: 'data.har.log.version', message: 'is the wrong type' }]),
  content: new ALFError([{ field: 'data.har.log.entries.0.request.content.mimeType', message: 'is required' }])
}

tap.test('v0.0.1', (t) => {
  t.test('failure', (assert) => {
    assert.plan(7)

    return Promise.all([
      validate({}, '0.0.1').catch((err) => assert.match(err, errors.object, 'should fail with empty object')),
      validate([], '0.0.1').catch((err) => assert.match(err, errors.array, 'should fail with empty array')),
      validate(undefined, '0.0.1').catch((err) => assert.match(err, errors.undef, 'should fail with undefined')),
      validate(fixtures.invalid.token, '0.0.1').catch((err) => assert.match(err, errors.token, 'should fail on bad "alf.serviceToken"')),
      validate(fixtures.invalid.creator, '0.0.1').catch((err) => assert.match(err, errors.creator, 'should fail on bad "log.creator"')),
      validate(fixtures.invalid.version, '0.0.1').catch((err) => assert.match(err, errors.version, 'should fail on bad "log.version"')),
      validate(fixtures.invalid.content, '0.0.1').catch((err) => assert.match(err, errors.content, 'should fail on bad "log.entries.*.request.content.mimeType"'))
    ])
  })

  t.test('success', (assert) => {
    assert.plan(4)

    return Promise.all([
      validate(fixtures.valid, '0.0.1').then((out) => assert.equal(out, fixtures.valid, 'should validate successfully with full example')),
      validate(fixtures.minimal, '0.0.1').then((out) => assert.equal(out, fixtures.minimal, 'should validate successfully with minimally required example')),
      validate(fixtures.example, '0.0.1').then((out) => assert.equal(out, fixtures.example, 'should validate alf spec example')),
      validate([fixtures.example], '0.0.1').then((out) => assert.match(out, [fixtures.example], 'should validate mutli alf objects'))
    ])
  })

  .then(t.end)
})
