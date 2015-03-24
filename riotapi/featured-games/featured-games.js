'use strict';

var keysInValues = require('../../helpers/keysInValues'),
	_            = require('../../helpers/lambda-ramda'),
	config       = require('config'),
	request      = require('sync-request'),

	featuredGames = function (region, options) {
		var encoding = options && options.encoding || config.encoding,
			region = region && region.constructor === String ? region : options.region || config.region,
			url = 'https://' + region + '.api.pvp.net/observer-mode/featured?api_key=' + config.api_key;
		return request('GET', url).getBody(encoding);
	}

module.exports = featuredGames;
