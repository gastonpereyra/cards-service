'use strict';

const Base = require('../../languages/base');

const StatFetcher = require('../../../controllers/github-request/user-languages-stats');

module.exports = class UserLanguagesGetApi extends Base {

	get StatFetcher() {
		return StatFetcher;
	}
};
