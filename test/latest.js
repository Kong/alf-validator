/* global describe, it */

'use strict'

var validate = require('..')

require('should-promised')

describe('Misc', function () {
  it('should default to latest', function () {
    validate({}, {}).should.be.rejected()
  })

  it('should not require options', function () {
    validate({}).should.be.rejected()
  })
})
