'use strict';

const Base = require('./repositroy-stats');

const REPOSITORY_STAT_QUERY = require('./queries/user-repository-stats');

module.exports = class UserRepositoryStatFetcher extends Base {

	static get query() {
		return REPOSITORY_STAT_QUERY;
	}

	static get kind() {
		return 'user';
	}
};
