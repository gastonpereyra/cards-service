'use strict';

const { API } = require('vercel-serverless-api');
const { struct } = require('superstruct');

const ErrorCard = require('../../controllers/graphics/cards/error');

const logger = require('../../lib/logger').init('User Stats');

const THIRTY_MINUTES = 1800;

module.exports = class BaseStatApi extends API {

	static get cache() {
		return THIRTY_MINUTES;
	}

	static get idsStruct() {
		return struct.partial({
			username: 'string'
		});
	}

	static get filtersStruct() {
		return struct.partial({
			hide: 'string?',
			hideTitle: 'string?',
			hideBorder: 'string?',
			hideYear: 'string?',
			showIcons: 'string?',
			includeAlCommits: 'string?',
			lineHeight: 'string?',
			width: 'string?',
			titleColor: 'string?',
			iconColor: 'string?',
			textColor: 'string?',
			theme: 'string?',
			backgroundColor: 'string?',
			cacheSeconds: 'string?'
		});
	}

	get logger() {
		return logger;
	}

	get StatsCard() {
		return {
			statsNames: []
		};
	}

	get ErrorCard() {
		return ErrorCard;
	}

	formatQueries() {
		return {
			hide: !this.filters.hide ? [] : this.filters.hide.split(',').filter(stat => this.StatsCard.statsNames.includes(stat)),
			hideTitle: this.filters.hideTitle ? this.filters.hideTitle === 'true' : false,
			hideBorder: this.filters.hideBorder ? this.filters.hideBorder === 'true' : false,
			hideYear: this.filters.hideYear ? this.filters.hideYear === 'true' : false,
			showIcons: this.filters.showIcons ? this.filters.showIcons === 'true' : true,
			includeAlCommits: this.filters.includeAlCommits ? this.filters.includeAlCommits === 'true' : true,
			lineHeight: Number(this.filters.lineHeight || 25),
			width: Number(this.filters.width || 460),
			colors: {
				...this.filters.titleColor && { title: this.filters.titleColor },
				...this.filters.iconColor && { icon: this.filters.iconColor },
				...this.filters.textColor && { text: this.filters.textColor },
				...this.filters.backgroundColor && { background: this.filters.backgroundColor },
				...this.filters.theme && { theme: this.filters.theme }
			},
			cacheSeconds: Number(this.filters.cacheSeconds || this.constructor.cache)
		};
	}

	countStars({ nodes = [] } = {}) {
		return nodes.reduce((prev, { stargazers = {} }) => {
			return prev + stargazers.totalCount || 0;
		}, 0);
	}
};
