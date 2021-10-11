'use strict';

const Base = require('../../repository/base');

const StatFetcher = require('../../../controllers/github-request/user-repository-stats');

module.exports = class UserRepositoryGetApi extends Base {

	static get fetcher() {
		return StatFetcher;
	}
};
