'use strict';

var keysInValues = require('../../helpers/keysInValues'),
	_            = require('../../helpers/lambda-ramda'),
	config       = require('config'),
	request      = require('sync-request'),
	url          = 'https://' + config.region +
				   '.api.pvp.net//observer-mode/rest/consumer/getSpectatorGameInfo/',

	currentGame = function (summonerId, platformId, options) {
		var encoding = options && options.encoding || config.encoding,
			platformId = platformId || config.platformId;
		return request('GET', url + platformId + '/' + summonerId  + '?api_key=' + config.api_key).getBody(encoding);
	}

module.exports = currentGame;
