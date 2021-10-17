'use strict';

const { API } = require('vercel-serverless-api');
const { struct } = require('superstruct');

const StatsCard = require('../../controllers/graphics/cards/languages');
const ErrorCard = require('../../controllers/graphics/cards/error');

const logger = require('../../lib/logger').init('Languages Stats');

const THIRTY_MINUTES = 1800;

module.exports = class BaseLanguagesGetApi extends API {

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
			isCompact: 'string?',
			width: 'string?',
			lineHeight: 'string?',
			titleColor: 'string?',
			iconColor: 'string?',
			textColor: 'string?',
			backgroundColor: 'string?',
			theme: 'string?',
			cacheSeconds: 'string?'
		});
	}

	async process() {

		const {
			cacheSeconds,
			colors,
			...queries
		} = this.formatQueries();

		this.setHeader('Content-Type', 'image/svg+xml');

		try {

			const repositoriesStats = await this.StatFetcher.get(this.pathIds);

			if(repositoriesStats.error) {
				logger.error(`Error getting Languages. ${repositoriesStats.error}`);
				throw new Error(repositoriesStats.error);
			}

			const stats = this.formatStats(repositoriesStats);

			logger.info(Object.values(stats));

			const card = new StatsCard(stats, queries, colors);

			this.setHeader('Cache-Control', `public, max-age=${cacheSeconds}`);

			this.setBody(card.render());

		} catch(error) {

			const card = new ErrorCard({ width: queries.width },
				'Cannot build Language\'s Card',
				error.message
			);

			this.setBody(card.render());
		}
	}

	formatQueries() {
		return {
			hide: !this.filters.hide ? [] : this.filters.hide.split(','),
			hideTitle: this.filters.hideTitle === 'true',
			hideBorder: this.filters.hideBorder === 'true',
			isCompact: this.filters.isCompact === 'true',
			width: Number(this.filters.width || 300),
			lineHeight: Number(this.filters.lineHeight || 25),
			colors: {
				...this.filters.titleColor && { title: this.filters.titleColor },
				...this.filters.iconColor && { icon: this.filters.iconColor },
				...this.filters.textColor && { text: this.filters.textColor },
				...this.filters.backgroundColor && { background: this.filters.backgroundColor },
				...this.filters.theme && { theme: this.filters.theme }
			},
			cacheSeconds: Number(this.filters.cacheSeconds || THIRTY_MINUTES)
		};
	}

	formatStats(repositoriesStats) {
		return repositoriesStats.reduce((languages, { size, node }) => {

			if(!languages[node.name])
				languages[node.name] = { ...node, size };
			else
				languages[node.name].size += size;

			return languages;
		}, {});
	}
};
