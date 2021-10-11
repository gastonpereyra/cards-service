'use strict';

const axios = require('axios');

const ERROR_RATE_LIMITED = 'RATE_LIMITED';
const ERROR_BAD_CREDENTIALS = 'Bad credentials';

module.exports = class GithubFetcherBase {

	static get url() {
		return 'https://api.github.com/graphql';
	}

	static get method() {
		return 'POST';
	}

	static get authorization() {
		return `bearer ${process.env.GITHUB_TOKEN}`;
	}

	static async get(variables) {

		const invalidRequest = this.validateRequest();

		if(invalidRequest)
			return invalidRequest;

		try {
			const response = await axios(this.formatRequest(variables));

			const invalidResponse = this.validateResponse(response);

			if(invalidResponse)
				return invalidResponse;

			return this.format(response.data);

		} catch(error) {

			if(error?.response?.data?.message === ERROR_BAD_CREDENTIALS)
				return { error: 'Invalid Crendentials' };

			return { error: error.message };
		}
	}

	static validateRequest() {

		if(!this.url)
			return { error: 'Invalid Request. URL is Missing' };

		if(!this.method)
			return { error: 'Invalid Request. Method is Missing' };

		if(!this.query)
			return { error: 'Invalid Request. Query is Missing' };

		if(!process.env.GITHUB_TOKEN)
			return { error: 'Invalid Request. Token is Missing' };

		if(!this.authorization)
			return { error: 'Invalid Request. Authorization is Missing' };
	}

	static formatRequest(variables) {
		return {
			url: this.url,
			method: this.method,
			headers: {
				Authorization: this.authorization
			},
			data: {
				query: this.query,
				...(variables && Object.keys(variables)) && { variables: this.getVariables(variables) }
			}
		};
	}

	static getVariables({ username }) {
		return {
			login: username
		};
	}

	static validateResponse(response) {

		if(!response?.data)
			return { error: 'No response from Github' };


		if(response.data.errors?.[0].type === ERROR_RATE_LIMITED)
			return { error: 'Limit Reached' };

		if(response.data.errors)
			return { error: response.data.errors[0]?.message || 'Cannot fetch data' };
	}

	static format(responseData) {
		return responseData;
	}
};
