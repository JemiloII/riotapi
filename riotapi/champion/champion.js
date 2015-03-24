'use strict';

var keysInValues = require('../../helpers/keysInValues'),
	_            = require('../../helpers/lambda-ramda'),
	champions    = require('../../../constants/champions.json'),
	config       = require('config'),
	request      = require('request'),
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
		return request('GET', url + query(defaults, options)).getBody(encoding);
	},

	getChampion = function (champion, options) {
		var encoding = options && options.encoding || config.encoding;
		return request('GET', url + '/' + championId(champion) + query(defaults, options)).getBody(encoding);
	},

	champion = function (champion, options) {
		if (champion === 'freetoplay' ||
			champion === 'free to play' ||
			champion === 'freeToPlay') {
			getAllChampions({ freeToPlay: true });
		} else if(!arguments.length) {
			getAllChampions();
		} else if (_.is(Object, arguments[0])) {
			getAllChampions(arguments[0]);
		} else {
			getChampion(champion, options);
		}
	};

module.exports = champion;
