'use strict';

var keysInValues = require('../../helpers/keysInValues'),
	_            = require('../../helpers/lambda-ramda'),
	config       = require('config'),
	request      = require('sync-request'),

	games = function (summonerId, options) {
		var encoding = options && options.encoding || config.encoding,
			region = region && region.constructor === String ? region : options.region || config.region,
			url = 'https://' + region + '/v1.3/game/by-summoner/' + summonerId + '/recent?api_key=' + config.api_key;
		return request('GET', url).getBody(encoding);
	}

module.exports = games;
