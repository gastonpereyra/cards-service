'use strict';

const Base = require('./base');

module.exports = class CommitsFetcher extends Base {

	static get url() {
		return 'https://api.github.com/search/commits?q=author:';
	}

	static get method() {
		return 'GET';
	}

	static get query() {
		return {
			'Content-Type': 'application/json',
			Accept: 'application/vnd.github.cloak-preview'
		};
	}

	static formatRequest(username) {
		return {
			url: `${this.url}${username}`,
			method: this.method,
			headers: {
				...this.query,
				Authorization: this.authorization
			}
		};
	}

	static format(responseData) {
		return responseData.total_count || 0;
	}
};
