'use strict';

var keysInValues = require('../../helpers/keysInValues'),
	_            = require('../../helpers/lambda-ramda'),
	champions    = require('../../../constants/champions.json'),
	config       = require('config'),
	request      = require('request'),
	encoding 	 = config.encoding,
	region 		 = config.region,

	defaults = {
		locale:  config.locale || '',
		champData: 'all',
		version: config.version !== 'latest' && config.version || '',
	},

	url = function () {
		'https://' + config.region +
		'.api.pvp.net/api/lol/static-data/' +
		config.region + '/v1.2/champion'
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


	getLeagueBySummoner = function (summonerId, options) {},

	getLeagueByTeam = function (teamId, options) {},

	getChallengerLeauge = function (options) {},

	getAllChampions = function (options) {
		return request('GET', url + query(defaults, options)).getBody(encoding);
	},

	getChampion = function (champion, options) {
		return request('GET', url + '/' + championId(champion) + query(defaults, options)).getBody(encoding);
	},

	league = function (bySelector, selectorId, options) {
		encoding = options && options.encoding || encoding;
		options = options || _.is('Object', selectorId) && selectorId || null;
		region = region && _.is(String, region) ? region : options.region || region;
		switch (bySelector) {
			case 'summoner':
				break;
			case 'team':
				break;
			default:

		}
		if (!arguments.length) {
			getChallengerLeauge();
		} else if (_.is(Object, arguments[0])) {
			getAllChampions(arguments[0]);
		} else {
			getChampion(champion, options);
		}
	};

module.exports = champion;
