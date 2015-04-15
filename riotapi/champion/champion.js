'use strict';

var keysInValues = require('../../lib/helpers/keysInValues'),
	_            = require('../../lib/helpers/lambda-ramda'),
	champions    = require('../../constants/champions.json'),
	config       = require('config'),
	log			 = require('../../lib/logger').getLogger(),
	request      = require('sync-request'),
	url          = 'https://' + config.region +
				   '.api.pvp.net/api/lol/' +
				   config.region + '/v1.2/champion',
	defaults = {
		freeToPlay: false
	},

	query  = function (defaults, options) {
		var optionsToQuery = _.compose(
				_.join(''),
				_.values,
				_.mapObjIndexed(keysInValues),
				_.merge(defaults)
			)(options);
		return '?' + optionsToQuery + 'api_key=' + config.api_key;
	},

	championId = function (id) {
		return _.is(Number, id) ? id : champions[id].id;
	},

	getAllChampions = function (options) {
		var encoding = options && options.encoding || config.encoding;
		log.info(encoding);
		log.info(url + query(defaults, options));
		return JSON.parse(
			request('GET', url + query(defaults, options)).getBody(encoding)
		);
	},

	getChampion = function (champion, options) {
		var encoding = options && options.encoding || config.encoding
		return JSON.parse(
			request('GET', url + '/' + championId(champion) + query(defaults, options)).getBody(encoding)
		);
	},

	champion = function (champion, options) {
		if (champion === 'freetoplay' ||
			champion === 'free to play' ||
			champion === 'freeToPlay') {
			return getAllChampions({ freeToPlay: true });
		} else if(!arguments.length) {
			log.info('No Arguments')
			return getAllChampions();
		} else if (_.is(Object, arguments[0])) {
			return getAllChampions(arguments[0]);
		} else {
			return getChampion(champion, options);
		}
	};

module.exports = champion;
