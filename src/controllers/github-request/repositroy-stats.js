'use strict';

const Base = require('./base');

module.exports = class RepositoryStatFetcher extends Base {

	static getVariables({ username, repositoryName }) {
		return {
			login: username,
			repo: repositoryName
		};
	}

	static format(responseData) {

		const data = responseData.data?.[this.kind];

		if(!data?.repository)
			return { error: 'Cannot found Repository' };

		if(data.repository.isPrivate)
			return { error: 'Repository is Private' };

		return data.repository;
	}
};
