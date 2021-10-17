'use strict';

const Base = require('./base');

const ORG_STAT_QUERY = require('./queries/organization-stats');

module.exports = class UserStatFetcher extends Base {

	static get query() {
		return ORG_STAT_QUERY;
	}

	static format(responseData) {
		return responseData.data?.organization || {};
	}
};
