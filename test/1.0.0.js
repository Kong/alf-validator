/* global describe, it */

'use strict'

var fixtures = require('./fixtures')
var validate = require('..')
var ValidationError = require('har-validator/lib/error')

require('should-promised')

describe('ALF v1.0.0', function () {
  it('should return a Promise', function () {
    validate().should.be.a.Promise()
  })

  it('should succeed', function () {
    var options = {
      version: '1.0.0'
    }

    validate(fixtures['1.0.0'].full, options).should.be.fulfilledWith(fixtures['1.0.0'].full)
  })

  it('should fail with empty object', function () {
    var options = {
      version: '1.0.0'
    }

    validate({}, options).should.be.rejectedWith(ValidationError, {
      errors: [
        {
          field: 'data.version',
          message: 'is required'
        },
        {
          field: 'data.serviceToken',
          message: 'is required'
        },
        {
          field: 'data.har',
          message: 'is required'
        }
      ]
    })
  })

  it('should fail with empty array', function () {
    var options = {
      version: '1.0.0'
    }

    validate([], options).should.be.rejectedWith(ValidationError, {
      errors: [
        {
          field: 'data',
          message: 'is the wrong type'
        }
      ]
    })
  })

  it('should fail with undefined', function () {
    var options = {
      version: '1.0.0'
    }

    validate(undefined, options).should.be.rejectedWith(ValidationError, {})
  })

  it('should fail on bad "log.creator"', function () {
    var options = {
      version: '1.0.0'
    }

    validate(fixtures['1.0.0'].invalid.creator, options).should.be.rejectedWith(ValidationError, {
      errors: [
        {
          field: 'data.har.log.creator.version',
          message: 'is required'
        }
      ]
    })
  })

  it('should fail on bad "log.version"', function () {
    var options = {
      version: '1.0.0'
    }

    validate(fixtures['1.0.0'].invalid.version, options).should.be.rejectedWith(ValidationError, {
      errors: [
        {
          field: 'data.har.log.version',
          message: 'is the wrong type'
        }
      ]
    })
  })

  it('should validate successfully with full example', function () {
    var options = {
      version: '1.0.0'
    }

    validate(fixtures['1.0.0'].full, options).should.be.fulfilled()
  })

  it('should succeed with minimally required example', function () {
    var options = {
      version: '1.0.0'
    }

    validate(fixtures['1.0.0'].minimal, options).should.be.fulfilled()
  })

  it('should succeed on multi ALF', function () {
    var options = {
      version: '1.0.0'
    }

    validate.multi(fixtures['1.0.0'].multi, options).should.be.fulfilled()
  })

  it('should fail on multi with one corrupt', function () {
    var options = {
      version: '1.0.0'
    }

    validate.multi(fixtures['1.0.0'].invalid.multi, options).should.be.rejectedWith(ValidationError, {
      errors: [
        {
          field: 'data.1.version',
          message: 'is required'
        }
      ]
    })
  })
})
