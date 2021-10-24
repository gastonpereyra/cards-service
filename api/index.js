'use strict';

const { handler } = require('vercel-serverless-api');
const { IndexAPI } = require('vercel-serverless-routes');

class Api extends IndexAPI {

	static get githubUser() {
		return {
			projectName: 'cards-service',
			user: 'gastonpereyra',
			owner: 'Gastón Pereyra'
		};
	}

	static get colors() {
		return {
			brand: '00ba7c',
			hover: '12694f',
			background: '15202b',
			disclaimer: '00ba7c',
			footerLine: '00ba7c'
		};
	}

	static get messages() {
		return {
			banner: 'https://user-images.githubusercontent.com/39351850/133937678-28adceb4-db43-419e-8e3f-cd087b1209bf.png',
			location: 'Buenos Aires, Argentina'
		};
	}
}

module.exports = async (...args) => handler(Api, ...args);
