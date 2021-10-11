'use strict';

const { API } = require('vercel-serverless-api');
const { struct } = require('superstruct');

const UserStatFetcher = require('../../controllers/github-request/user-stats');
const CommitsFetcher = require('../../controllers/github-request/commits');

const StatsCard = require('../../controllers/graphics/cards/stats-card');
const ErrorCard = require('../../controllers/graphics/cards/error');

const logger = require('../../lib/logger').init('User Stats');

const THIRTY_MINUTES = 1800;

module.exports = class UserGetApi extends API {

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

	async process() {

		const {
			includeAlCommits,
			cacheSeconds,
			colors,
			...queries
		} = this.formatQueries();

		this.setHeader('Content-Type', 'image/svg+xml');

		try {

			const [userStats, totalCommits] = await Promise.all([
				UserStatFetcher.get(this.pathIds),
				includeAlCommits && CommitsFetcher.get(this.pathIds.username)
			]);

			if(userStats.error) {
				logger.error(`Error getting User. ${userStats.error}`);
				throw new Error('Cannot get User Data from Github');
			}

			if(totalCommits.error)
				logger.error(`Error getting Extra Commits. ${totalCommits.error}`);

			const stats = this.formatStats(userStats, totalCommits);

			logger.info('User Stats');
			logger.info(stats);

			const card = new StatsCard(stats, queries, colors);

			this.setHeader('Cache-Control', `public, max-age=${cacheSeconds}`);

			this.setBody(card.render());

		} catch(error) {

			const card = new ErrorCard({ width: queries.width },
				'Cannot build User\'s Card',
				error.message
			);

			this.setBody(card.render());
		}
	}

	formatQueries() {
		return {
			hide: !this.filters.hide ? [] : this.filters.hide.split(',').filters(stat => StatsCard.statsNames.includes(stat)),
			hideTitle: Boolean(this.filters.hideTitle || false),
			hideBorder: Boolean(this.filters.hideBorder || false),
			hideYear: Boolean(this.filters.hideYear || false),
			showIcons: Boolean(this.filters.showIcons || true),
			includeAlCommits: Boolean(this.filters.includeAlCommits || true),
			lineHeight: Number(this.filters.lineHeight || 25),
			width: Number(this.filters.width || 460),
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

	formatStats(userStats, totalCommits) {

		const createdToActualDate = new Date() - new Date(userStats.createdAt);

		return {
			name: userStats.name || userStats.login,
			totalPRs: userStats.pullRequests?.totalCount || 0,
			totalCommits: this.countCommits(userStats.contributionsCollection, totalCommits),
			totalIssues: userStats.issues?.totalCount || 0,
			totalStars: this.countStars(userStats.repositories),
			contributedTo: userStats.repositoriesContributedTo?.totalCount || 0,
			miliSecondsActive: createdToActualDate
		};
	}

	countCommits({ totalCommitContributions = 0, restrictedContributionsCount = 0 } = {}, totalCommits = 0) {
		return (totalCommits.error ? 0 : totalCommits) + totalCommitContributions + restrictedContributionsCount;
	}

	countStars({ nodes = [] } = {}) {
		return nodes.reduce((prev, { stargazers = {} }) => {
			return prev + stargazers.totalCount || 0;
		}, 0);
	}
};
