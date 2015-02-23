'use strict';

var _      = require('./lambda-ramda'),
	config = require('config');

var keysInValues = function (val, key) {
	var ampersand = key !== 'api_key' ? '&' : '';
	val = _.is(Array, val) ? _.toString(val) : val;
	return key + '=' + val + ampersand;
}



module.exports = keysInValues;
