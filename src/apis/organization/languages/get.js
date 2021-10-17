'use strict';

const Base = require('../../languages/base');

const StatFetcher = require('../../../controllers/github-request/organization-languages-stats');

module.exports = class OrganizationLanguagesGetApi extends Base {

	get StatFetcher() {
		return StatFetcher;
	}
};
