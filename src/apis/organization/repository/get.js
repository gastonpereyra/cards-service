'use strict';

const Base = require('../../repository/base');

const StatFetcher = require('../../../controllers/github-request/organization-repository-stats');

module.exports = class OrgRepositoryGetApi extends Base {

	static get fetcher() {
		return StatFetcher;
	}
};
