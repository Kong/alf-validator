/* global describe, it */

'use strict'

var should = require('should')

var fixtures = require('./fixtures')
var validate = require('..')

describe('ALF Spec', function () {
  it('should fail with empty object', function (done) {
    validate({}, function (e, valid) {
      valid.should.be.false

      e.errors[0].should.have.property('field').and.equal('data.serviceToken')
      e.errors[0].should.have.property('message').and.equal('is required')

      e.errors[1].should.have.property('field').and.equal('data.har')
      e.errors[1].should.have.property('message').and.equal('is required')

      done()
    })
  })

  it('should fail with empty array', function (done) {
    validate([], function (e, valid) {
      valid.should.be.false

      e.errors[0].should.have.property('field').and.equal('data')
      e.errors[0].should.have.property('message').and.equal('is the wrong type')

      done()
    })
  })

  it('should fail with undefined', function (done) {
    validate(undefined, function (e, valid) {
      valid.should.be.false

      should.not.exist(e)

      done()
    })
  })

  it('should fail on bad "alf.serviceToken"', function (done) {
    validate(fixtures.invalid.token, function (e, valid) {
      valid.should.be.false

      e.errors[0].should.have.property('field').and.equal('data.serviceToken')
      e.errors[0].should.have.property('message').and.equal('is required')

      done()
    })
  })

  it('should fail on bad "log.creator"', function (done) {
    validate(fixtures.invalid.creator, function (e, valid) {
      valid.should.be.false

      e.errors[0].should.have.property('field').and.equal('data.har.log.creator.version')
      e.errors[0].should.have.property('message').and.equal('is required')

      done()
    })
  })

  it('should fail on bad "log.version"', function (done) {
    validate(fixtures.invalid.version, function (e, valid) {
      valid.should.be.false

      e.errors[0].should.have.property('field').and.equal('data.har.log.version')
      e.errors[0].should.have.property('message').and.equal('is the wrong type')

      done()
    })
  })

  it('should validate successfully with full example', function (done) {
    validate(fixtures.valid, function (e, valid) {
      should.not.exist(e)
      valid.should.be.true

      done()
    })
  })

  it('should validate successfully with minimally required example', function (done) {
    validate(fixtures.minimal, function (e, valid) {
      should.not.exist(e)
      valid.should.be.true

      done()
    })
  })

  it('should validate alf spec example', function (done) {
    validate(fixtures.example, function (e, valid) {
      should.not.exist(e)
      valid.should.be.true

      done()
    })
  })
})
