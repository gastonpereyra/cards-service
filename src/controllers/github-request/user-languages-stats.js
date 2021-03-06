'use strict';

const Base = require('./base');

const LANGUAGE_STAT_QUERY = require('./queries/user-languages-stat');

module.exports = class UserLanguagesStatFetcher extends Base {

	static get query() {
		return LANGUAGE_STAT_QUERY;
	}

	static format(responseData) {

		const repoNodes = responseData?.data?.user?.repositories?.nodes;

		if(!repoNodes)
			return { error: 'Cannot found Repositories Data' };

		return repoNodes.flatMap(node => node?.languages?.edges);
	}
};
