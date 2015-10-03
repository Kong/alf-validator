/* global describe, it */

'use strict'

var fixtures = require('./fixtures')
var validate = require('..')
var ValidationError = require('har-validator/lib/error')

require('should-promised')

describe('ALF v0.0.1', function () {
  it('should return a Promise', function () {
    validate().should.be.a.Promise()
  })

  it('should succeed', function () {
    var options = {
      version: '0.0.1'
    }

    validate(fixtures['0.0.1'].valid, options).should.be.fulfilledWith(fixtures['0.0.1'].valid)
  })

  it('should fail with empty object', function () {
    var options = {
      version: '0.0.1'
    }

    validate({}, options).should.be.rejectedWith(ValidationError, {
      errors: [
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
      version: '0.0.1'
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
      version: '0.0.1'
    }

    validate(undefined, options).should.be.rejectedWith(ValidationError, {})
  })

  it('should fail on bad "alf.serviceToken"', function () {
    var options = {
      version: '0.0.1'
    }

    validate(fixtures['0.0.1'].invalid.token, options).should.be.rejectedWith(ValidationError, {
      errors: [
        {
          field: 'data.serviceToken',
          message: 'is required'
        }
      ]
    })
  })

  it('should fail on bad "log.creator"', function () {
    var options = {
      version: '0.0.1'
    }

    validate(fixtures['0.0.1'].invalid.creator, options).should.be.rejectedWith(ValidationError, {
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
      version: '0.0.1'
    }

    validate(fixtures['0.0.1'].invalid.version, options).should.be.rejectedWith(ValidationError, {
      errors: [
        {
          field: 'data.har.log.version',
          message: 'is the wrong type'
        }
      ]
    })
  })

  it('should fail on bad "log.entries.*.request.content.mimeType"', function () {
    var options = {
      version: '0.0.1'
    }

    validate(fixtures['0.0.1'].invalid.content, options).should.be.rejectedWith(ValidationError, {
      errors: [
        {
          field: 'data.har.log.entries.0.request.content.mimeType',
          message: 'is required'
        }
      ]
    })
  })

  it('should validate successfully with full example', function () {
    var options = {
      version: '0.0.1'
    }

    validate(fixtures['0.0.1'].valid, options).should.be.rejectedWith(ValidationError, {})
  })

  it('should validate successfully with minimally required example', function () {
    var options = {
      version: '0.0.1'
    }

    validate(fixtures['0.0.1'].minimal, options).should.be.rejectedWith(ValidationError, {})
  })

  it('should validate alf spec example', function () {
    var options = {
      version: '0.0.1'
    }

    validate(fixtures['0.0.1'].example, options).should.be.rejectedWith(ValidationError, {})
  })
})
