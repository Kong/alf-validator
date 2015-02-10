'use strict';

var should = require('should');

var fixtures = require('./fixtures');
var validate = require('..');

describe('ALF Spec', function () {
  it('should fail with empty object', function (done) {
    validate({}, function (err, valid) {
      err[0].should.have.property('message');
      err[0].message.should.equal('missing required properties');
    });

    done();
  });

  it('should fail with empty array', function (done) {
    validate([], function (err, valid) {
      err[0].should.have.property('message');
      err[0].message.should.equal('missing required properties');
    });

    done();
  });

  it('should fail on bad "alf.serviceToken"', function (done) {
    validate(fixtures.invalid.token, function (err, valid) {
      err[0].field.should.equal('data');
      err[0].message.should.equal('missing required properties');
    });

    done();
  });

  it('should fail on bad "log.creator"', function (done) {
    validate(fixtures.invalid.creator, function (err, valid) {
      err[0].should.have.property('message');
      err[0].message.should.equal('referenced schema does not match');
    });

    done();
  });

  it('should not fail with full example', function () {
    validate(fixtures.valid, function (err, valid) {
      should.not.exist(err);
      valid.should.be.true;
    });
  });
});
