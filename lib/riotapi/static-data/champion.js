'use strict';

var processOptions = require('../../helpers/processOptions'),
	_        = require('../../helpers/lambda-ramda'),
	config   = require('config'),
	request  = require('request'),
	url      = 'https://' + config.region + 'pvp.net/api/lol/' + config.region + '/v1.2/champion',

	response = function (x) {
		return x;
	},

	getAllChampions = function (options) {
		var query = processOptions(options);
		return request(url + query, response);
	},

	getChampion = function (champion, options) {
		var query = processOptions(options);
		return request(url + query, response);
	},

	champion = function (champion, options) {
		if (!arguments.length) {
			console.log('No Arguments');
			getAllChampions();
		} else if (_.is(Object, arguments[0])) {
			console.log('First Argument is a Object');
			getAllChampions(options);
		} else {
			console.log('Arguments!');
			getChampion(champion, options);
		}
	};

champion();
champion('Lux');
champion('Lux', {locales: 'es_ES', version: '3.5.1', champData: ['blurb','image','stats']});

module.exports = champion;
