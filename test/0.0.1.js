/* global describe, it */

'use strict'

var should = require('should')

var fixtures = require('./fixtures')
var validate = require('..')

describe('ALF v0.0.1', function () {
  describe('no callback', function () {
    it('should fail', function (done) {
      var options = {
        version: '0.0.1'
      }

      validate({}, options).should.be.false

      done()
    })

    it('should succeed', function (done) {
      var options = {
        version: '0.0.1'
      }

      validate(fixtures['0.0.1'].valid, options).should.be.true

      done()
    })
  })

  describe('callback', function () {
    it('should fail with empty object', function (done) {
      var options = {
        version: '0.0.1'
      }

      validate({}, options, function (e, valid) {
        valid.should.be.false

        e.errors[0].should.have.property('field').and.equal('data.serviceToken')
        e.errors[0].should.have.property('message').and.equal('is required')

        e.errors[1].should.have.property('field').and.equal('data.har')
        e.errors[1].should.have.property('message').and.equal('is required')

        done()
      })
    })

    it('should fail with empty array', function (done) {
      var options = {
        version: '0.0.1'
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
        version: '0.0.1'
      }

      validate(undefined, options, function (e, valid) {
        valid.should.be.false

        should.not.exist(e)

        done()
      })
    })

    it('should fail on bad "alf.serviceToken"', function (done) {
      var options = {
        version: '0.0.1'
      }

      validate(fixtures['0.0.1'].invalid.token, options, function (e, valid) {
        valid.should.be.false

        e.errors[0].should.have.property('field').and.equal('data.serviceToken')
        e.errors[0].should.have.property('message').and.equal('is required')

        done()
      })
    })

    it('should fail on bad "log.creator"', function (done) {
      var options = {
        version: '0.0.1'
      }

      validate(fixtures['0.0.1'].invalid.creator, options, function (e, valid) {
        valid.should.be.false

        e.errors[0].should.have.property('field').and.equal('data.har.log.creator.version')
        e.errors[0].should.have.property('message').and.equal('is required')

        done()
      })
    })

    it('should fail on bad "log.version"', function (done) {
      var options = {
        version: '0.0.1'
      }

      validate(fixtures['0.0.1'].invalid.version, options, function (e, valid) {
        valid.should.be.false

        e.errors[0].should.have.property('field').and.equal('data.har.log.version')
        e.errors[0].should.have.property('message').and.equal('is the wrong type')

        done()
      })
    })

    it('should fail on bad "log.entries.*.request.content.mimeType"', function (done) {
      var options = {
        version: '0.0.1'
      }

      validate(fixtures['0.0.1'].invalid.content, options, function (e, valid) {
        valid.should.be.false

        e.errors[0].should.have.property('field').and.equal('data.har.log.entries.*.request.content.mimeType')
        e.errors[0].should.have.property('message').and.equal('is required')

        done()
      })
    })

    it('should validate successfully with full example', function (done) {
      var options = {
        version: '0.0.1'
      }

      validate(fixtures['0.0.1'].valid, options, function (e, valid) {
        should.not.exist(e)
        valid.should.be.true

        done()
      })
    })

    it('should validate successfully with minimally required example', function (done) {
      var options = {
        version: '0.0.1'
      }

      validate(fixtures['0.0.1'].minimal, options, function (e, valid) {
        should.not.exist(e)
        valid.should.be.true

        done()
      })
    })

    it('should validate alf spec example', function (done) {
      var options = {
        version: '0.0.1'
      }

      validate(fixtures['0.0.1'].example, options, function (e, valid) {
        should.not.exist(e)
        valid.should.be.true

        done()
      })
    })
  })
})
