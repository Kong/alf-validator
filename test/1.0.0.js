/* global describe, it */

'use strict'

var should = require('should')

var fixtures = require('./fixtures')
var validate = require('..')

describe('ALF v1.0.0', function () {
  it('should fail with empty object', function (done) {
    var options = {
      version: '1.0.0'
    }

    validate({}, options, function (e, valid) {
      valid.should.be.false

      e.errors[0].should.have.property('field').and.equal('data.version')
      e.errors[0].should.have.property('message').and.equal('is required')

      e.errors[1].should.have.property('field').and.equal('data.serviceToken')
      e.errors[1].should.have.property('message').and.equal('is required')

      e.errors[2].should.have.property('field').and.equal('data.har')
      e.errors[2].should.have.property('message').and.equal('is required')

      done()
    })
  })

  it('should fail with empty array', function (done) {
    var options = {
      version: '1.0.0'
    }

    validate([], options, function (e, valid) {
      valid.should.be.false

      e.errors[0].should.have.property('field').and.equal('data')
      e.errors[0].should.have.property('message').and.equal('is the wrong type')

      done()
    })
  })

  it('should fail with undefined', function (done) {
    var options = {
      version: '1.0.0'
    }

    validate(undefined, options, function (e, valid) {
      valid.should.be.false

      should.not.exist(e)

      done()
    })
  })

  it('should fail on bad "log.creator"', function (done) {
    var options = {
      version: '1.0.0'
    }

    validate(fixtures['1.0.0'].invalid.creator, options, function (e, valid) {
      valid.should.be.false

      e.errors[0].should.have.property('field').and.equal('data.har.log.creator.version')
      e.errors[0].should.have.property('message').and.equal('is required')

      done()
    })
  })

  it('should fail on bad "log.version"', function (done) {
    var options = {
      version: '1.0.0'
    }

    validate(fixtures['1.0.0'].invalid.version, options, function (e, valid) {
      valid.should.be.false

      e.errors[0].should.have.property('field').and.equal('data.har.log.version')
      e.errors[0].should.have.property('message').and.equal('is the wrong type')

      done()
    })
  })

  it('should validate successfully with full example', function (done) {
    var options = {
      version: '1.0.0'
    }

    validate(fixtures['1.0.0'].valid, options, function (e, valid) {
      should.not.exist(e)
      valid.should.be.true

      done()
    })
  })

  it('should validate successfully with minimally required example', function (done) {
    var options = {
      version: '1.0.0'
    }

    validate(fixtures['1.0.0'].minimal, options, function (e, valid) {
      should.not.exist(e)
      valid.should.be.true

      done()
    })
  })

  it('should validate alf spec example', function (done) {
    var options = {
      version: '1.0.0'
    }

    validate(fixtures['1.0.0'].example, options, function (e, valid) {
      should.not.exist(e)
      valid.should.be.true

      done()
    })
  })
})
