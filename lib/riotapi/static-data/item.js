'use strict';

var keysInValues = require('../../helpers/keysInValues'),
	_            = require('../../helpers/lambda-ramda'),
	//items    	 = require('../../../constants/items.json'),
	config       = require('config'),
	request      = require('request'),
	url          = 'https://' + config.region +
				   '.api.pvp.net/api/lol/static-data/' +
				   config.region + '/v1.2/item',
	data = '',

	query  = function (options) {
		var defaults = {
				locale:  config.locale || '',
				itemListData: 'all',
				version: config.version !== 'latest' && config.version || '',
			},
			optionsToQuery = _.compose(
				_.join(''),
				_.values,
				_.mapObjIndexed(keysInValues),
				_.merge(defaults)
			)(options);
		console.log(url + '?' + optionsToQuery + 'api_key=' + config.api_key);
		return '?' + optionsToQuery + 'api_key=' + config.api_key;
	},

	itemId = function (name) {
		return _.is(Number, name) ? name : items[name].id;
	},

	response = function (error, data) {
		if(error) { console.error(error); }
		return data;
	},

	getAllItems = function (options) {
		return request(url + query(options), function (error, data) {
			if (error) { console.error(error); }
			return data;
		});
	},

	getItem = function (item, options) {
		return request.get(url + '/' + itemId(item) + query(options)).pipe(response);
	},

	item = function (item, options) {
		if (!arguments.length) {
			return getAllItems();
		} else if (_.is(Object, arguments[0])) {
			return getAllItems(arguments[0]);
		} else {
			return getItem(item, options);
		}
	};

module.exports = item;

console.log(item());
