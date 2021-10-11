'use strict';

const Base = require('./repositroy-stats');

const REPOSITORY_STAT_QUERY = require('./queries/organization-repository-stats');

module.exports = class OrgRepositoryStatFetcher extends Base {

	static get query() {
		return REPOSITORY_STAT_QUERY;
	}

	static get kind() {
		return 'organization';
	}
};
