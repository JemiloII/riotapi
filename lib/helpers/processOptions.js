'use strict';

var _      = require('./lambda-ramda'),
	config = require('config');

var keysInValues = function (val, key) {
	console.log('key: ' + key + ' val: ' + val);
	val = _.is(Array, val) ? _.toString(val) : val;
	var ampersand = key !== 'api_key' ? '&' : '';
	console.log(key + '=' + val + ampersand);
	return key + '=' + val + ampersand;
}

var processOptions = function (options) {
	var defaults = {
		locales: config.locales || '',
		champData: 'all',
		version: config.version !== 'latest' && config.version || '',
		api_key: config.api_key
	};

	console.log('return: ', '?' + _.compose(_.join(''), _.values, _.mapObjIndexed(keysInValues), _.merge(defaults))(options));
};

module.exports = processOptions;
