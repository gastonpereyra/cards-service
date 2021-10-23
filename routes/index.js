'use strict';

const organization = require('./organization');
const user = require('./user');

module.exports = [
	...user,
	...organization
];
