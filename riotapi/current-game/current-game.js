'use strict';

var keysInValues = require('../../lib/helpers/keysInValues'),
	_            = require('../../lib/helpers/lambda-ramda'),
	config       = require('config'),
	log			 = require('../../lib/logger').getLogger(),
	request      = require('sync-request'),
	url          = 'https://' + config.region +
				   '.api.pvp.net//observer-mode/rest/consumer/getSpectatorGameInfo/',

	currentGame = function (summonerId, platformId, options) {
		var encoding = options && options.encoding || config.encoding,
			platformId = platformId || config.platformId;
		log.info(encoding);
		log.info(url + platformId + '/' + summonerId  + '?api_key=' + config.api_key);
		return request('GET', url + platformId + '/' + summonerId  + '?api_key=' + config.api_key).getBody(encoding);
	}

module.exports = currentGame;
