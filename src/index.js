'use strict';

var validator = require('is-my-json-valid/require');
var validate = validator('./schema.json');

module.exports = function (data, cb) {
  // execute is-my-json-valid
  var valid = validate(data);

  // callback?
  if (cb) {
    return cb(validate.errors, valid);
  }

  return valid;
};
