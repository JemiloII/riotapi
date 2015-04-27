'use strict';

var keysInValues = require('../../lib/helpers/keysInValues'),
	_            = require('../../lib/helpers/lambda-ramda'),
	config       = require('config'),
	log			 = require('../../lib/logger').getLogger(),
	request      = require('sync-request'),

	featuredGames = function (region, options) {
		var encoding = options && options.encoding || config.encoding,
			region = region && region.constructor === String ? region : options && options.region || config.region,
			url = 'https://' + region + '.api.pvp.net/observer-mode/rest/featured?api_key=' + config.api_key;
		log.info(url);
		return request('GET', url).getBody(encoding);
	}

module.exports = featuredGames;

