'use strict';

const { handler } = require('vercel-serverless-api');

const Base = require('../../../src/apis/languages/base');
const StatFetcher = require('../../../src/controllers/github-request/user-languages-stats');

class API extends Base {

	get StatFetcher() {
		return StatFetcher;
	}
}

module.exports = async (...args) => handler(API, ...args);
