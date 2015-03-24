'use strict';

var _ = require('../../lib/helpers/lambda-ramda.js'),
	fs = require('fs'),
	filePath = require("path").join(__dirname),
	modules = {},

	requireFile = function(file) {
		var properyName = _.replace('.js', file);
		myModule[properyName] = require(file);
	};

_.map(requireFile, fs.readdirSync(filePath));

module.exports = modules;
