'use strict';
// todo: write test


champion();
champion({
	locale: 'en_US',
	version: '3.5.1',
	dataById: true,
	champData: [
		'blurb',
		'image',
		'stats'
	]
});
champion('Lux');
champion('Lux', {
	locale: 'es_ES',
	version: '5.3.1',
	champData: [
		'blurb',
		'image',
		'stats'
	]
});
