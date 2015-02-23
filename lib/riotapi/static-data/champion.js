'use strict';

var keysInValues = require('../../helpers/keysInValues'),
	_            = require('../../helpers/lambda-ramda'),
	champions    = require('../../../constants/champions.json'),
	config       = require('config'),
	request      = require('request'),
	url          = 'https://' + config.region +
				   '.api.pvp.net/api/lol/static-data/' +
				   config.region + '/v1.2/champion',

	query  = function (options) {
		var defaults = {
				locale:  config.locale || '',
				champData: 'all',
				version: config.version !== 'latest' && config.version || '',
			},
			optionsToQuery = _.compose(
				_.join(''),
				_.values,
				_.mapObjIndexed(keysInValues),
				_.merge(defaults)
			)(options);
		return '?' + optionsToQuery + 'api_key=' + config.api_key;
	},

	championId = function (name) {
		return _.is(Number, name) ? name : champions[name].id;
	},

	response = function (error, data) {
		if (error) { return console.error(error); }
		return data;
	},

	getAllChampions = function (options) {
		return request(url + query(options), response);
	},

	getChampion = function (champion, options) {
		return request(url + '/' + championId(champion) + query(options), response);
	},

	champion = function (champion, options) {
		if (!arguments.length) {
			getAllChampions();
		} else if (_.is(Object, arguments[0])) {
			getAllChampions(arguments[0]);
		} else {
			getChampion(champion, options);
		}
	};

module.exports = champion;
