'use strict';

const fs = require('fs');

const ApiRoutes = require('./routes');

const routes = {
	routes: [
		...ApiRoutes,
		{
			src: '/',
			methods: ['GET'],
			dest: '/api/index'
		},
		{
			src: '/.*',
			dest: '/api/not-found/message'
		}
	]
};

fs.writeFile('./vercel.json', JSON.stringify(routes), err => {
	if(err)
		console.error(err);
});
