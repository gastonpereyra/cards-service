'use strict';

const { API } = require('vercel-serverless-api');
const { struct } = require('superstruct');

const StatsCard = require('../../controllers/graphics/cards/repository');
const ErrorCard = require('../../controllers/graphics/cards/error');

const logger = require('../../lib/logger').init('Repository Stats');

const THIRTY_MINUTES = 1800;

module.exports = class BaseRepositoryGetApi extends API {

	static get idsStruct() {
		return struct.partial({
			username: 'string',
			repositoryName: 'string'
		});
	}

	static get filtersStruct() {
		return struct.partial({
			hideBorder: 'string?',
			hideTitle: 'string?',
			showOwner: 'string?',
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

	async process() {

		const {
			cacheSeconds,
			colors,
			...queries
		} = this.formatQueries();

		this.setHeader('Content-Type', 'image/svg+xml');

		try {

			const repositoryStat = await this.constructor.fetcher.get(this.pathIds);

			if(repositoryStat.error) {
				logger.error(`Error getting Repository. ${repositoryStat.error}`);
				throw new Error(repositoryStat.error);
			}

			const stats = this.formatStats(repositoryStat);

			logger.info('Repository Stats');
			logger.info(stats);

			const card = new StatsCard(stats, queries, colors);

			this.setHeader('Cache-Control', `public, max-age=${cacheSeconds}`);

			this.setBody(card.render());

		} catch(error) {

			this.setHeader('Content-Type', 'image/svg+xml');
			const card = new ErrorCard({ width: queries.width },
				'Cannot build Repository\'s Card',
				error.message
			);

			this.setBody(card.render());
		}
	}

	formatQueries() {
		return {
			hideBorder: Boolean(this.filters.hideBorder || false),
			hideTitle: Boolean(this.filters.hideTitle || false),
			showOwner: Boolean(this.filters.showOwner || true),
			lineHeight: Number(this.filters.lineHeight || 10),
			width: Number(this.filters.width || 400),
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

	formatStats({ stargazers, primaryLanguage, ...repositoryStat }) {
		return {
			...repositoryStat,
			starsCount: stargazers.totalCount,
			language: {
				name: primaryLanguage?.name || 'Unspecified',
				color: primaryLanguage?.color || '#333'
			}
		};
	}
};
