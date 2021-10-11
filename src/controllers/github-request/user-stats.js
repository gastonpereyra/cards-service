'use strict';

const Base = require('./base');

const USER_STAT_QUERY = require('./queries/user-stats');

module.exports = class UserStatFetcher extends Base {

	static get query() {
		return USER_STAT_QUERY;
	}

	static format(responseData) {
		return responseData.data?.user || {};
	}
};
