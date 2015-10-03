/* global describe, it */

'use strict'

var fixtures = require('./fixtures')
var should = require('should')
var validate = require('../lib/async')

describe('Async', function () {
  describe('no callback', function () {
    it('should fail', function (done) {
      var options = {
        version: '1.0.0'
      }

      validate({}, options).should.be.false

      done()
    })

    it('should succeed', function (done) {
      var options = {
        version: '1.0.0'
      }

      validate(fixtures['1.0.0'].full, options).should.be.true

      done()
    })
  })

  describe('with callback', function () {
    it('should fail', function (done) {
      var options = {
        version: '1.0.0'
      }

      validate({}, options, function (err, valid) {
        valid.should.be.false
        err.should.exist

        done()
      })
    })

    it('should succeed', function (done) {
      var options = {
        version: '1.0.0'
      }

      validate(fixtures['1.0.0'].full, options, function (err, valid) {
        valid.should.be.false
        should.not.exist(err)

        done()
      })
    })
  })
})
