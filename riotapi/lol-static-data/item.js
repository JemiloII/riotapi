'use strict';

var keysInValues = require('../../helpers/keysInValues'),
	_            = require('../../helpers/lambda-ramda'),
	//items    	 = require('../../../constants/items.json'),
	config       = require('config'),
	request      = require('sync-request'),
	url          = 'https://' + config.region +
				   '.api.pvp.net/api/lol/static-data/' +
				   config.region + '/v1.2/item',
	defaults 	= {
		locale:  config.locale || '',
		itemListData: 'all',
		version: config.version !== 'latest' && config.version || '',
	},

	query  = function (defaults, options) {
		var optionsToQuery = _.compose(
				_.join(''),
				_.values,
				_.mapObjIndexed(keysInValues),
				_.merge(defaults)
			)(options);
		console.log(url + '?' + optionsToQuery + 'api_key=' + config.api_key);
		return '?' + optionsToQuery + 'api_key=' + config.api_key;
	},

	itemId = function (id) {
		// if not an id, lookup number by name
		return _.is(Number, id) ? id : items[id].id;
	},

	getAllItems = function (options) {
		var encoding = options && options.encoding || config.encoding;
		return request('GET', url + query(defaults, options)).getBody(encoding);
	},

	getItem = function (item, options) {
		var encoding = options && options.encoding || config.encoding;
		return request('GET', url + '/' + itemId(item) + query(defaults, options)).getBody(encoding);
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
