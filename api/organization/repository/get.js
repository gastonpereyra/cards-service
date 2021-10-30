'use strict';

const { handler } = require('vercel-serverless-api');

const Base = require('../../../src/apis/repository/base');
const StatFetcher = require('../../../src/controllers/github-request/organization-repository-stats');

class API extends Base {

	static get fetcher() {
		return StatFetcher;
	}
}

module.exports = async (...args) => handler(API, ...args);
