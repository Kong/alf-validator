'use strict';

var should = require('should');

var fixtures = require('./fixtures');
var validate = require('..');

describe('ALF Spec', function () {
  it('should fail with empty object', function (done) {
    validate({}, function (err, valid) {
      valid.should.be.false;

      err[0].should.have.property('field').and.equal('data.serviceToken');
      err[0].should.have.property('message').and.equal('is required');

      err[1].should.have.property('field').and.equal('data.har');
      err[1].should.have.property('message').and.equal('is required');

      done();
    });
  });

  it('should fail with empty array', function (done) {
    validate([], function (err, valid) {
      valid.should.be.false;

      err[0].should.have.property('field').and.equal('data');
      err[0].should.have.property('message').and.equal('is the wrong type');

      done();
    });
  });

  it('should fail with undefined', function (done) {
    validate(undefined, function (err, valid) {
      valid.should.be.false;

      done();
    });
  });

  it('should fail on bad "alf.serviceToken"', function (done) {
    validate(fixtures.invalid.token, function (err, valid) {
      valid.should.be.false;

      err[0].should.have.property('field').and.equal('data.serviceToken');
      err[0].should.have.property('message').and.equal('is required');

      done();
    });
  });

  it('should fail on bad "log.creator"', function (done) {
    validate(fixtures.invalid.creator, function (err, valid) {
      err[0].should.have.property('field').and.equal('data.har.log.creator');
      err[0].should.have.property('message').and.equal('referenced schema does not match');

      done();
    });
  });

  it('should validate successfully with full example', function (done) {
    validate(fixtures.valid, function (err, valid) {
      should.not.exist(err);
      valid.should.be.true;

      done();
    });
  });

  it('should validate successfully with minimally required example', function(done) {
    validate(fixtures.minimal, function (err, valid) {
      should.not.exist(err);
      valid.should.be.true;

      done();
    });
  });

  it('should validate alf spec example', function(done) {
    validate(fixtures.example, function (err, valid) {
      should.not.exist(err);
      valid.should.be.true;

      done();
    });
  });
});
