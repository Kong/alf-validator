/* global describe, it */

'use strict'

var schema = require('../src/schema')
var validate = require('..')

require('should')

describe('Misc', function () {
  it('should default to latest', function (done) {
    validate({}, {}).should.be.false

    done()
  })

  it('should not require options', function (done) {
    validate({}).should.be.false

    done()
  })

  it('should return schema', function (done) {
    var version = '1.0.0'

    validate.schema(version).should.be.equal(schema[version])

    done()
  })
})
