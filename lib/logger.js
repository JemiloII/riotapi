'use strict';

var bunyan       = require('bunyan'),
	bunyanFormat = require('bunyan-format'),
	config       = require('config'),
	path         = require('path');

var isDevMode = config.util.getEnv('NODE_ENV') === 'development',
	streams = [];

if (isDevMode) {
	streams.push({
		level: 'debug',
		stream: bunyanFormat({outputMode: 'short'})
	});
} else {
	streams.push({
		level: 'info',
		path: path.join(__dirname, '../logs/server.log')
	});
}

module.exports = {
	getLogger: function () {
		return bunyan.createLogger({
			name: 'sauce-queue',
			streams: streams
		});
	},

	chainedDebug: function (x) {
		this.getLogger().debug(x);
		return x;
	}
};
