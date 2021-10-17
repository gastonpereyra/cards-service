'use strict';

const StatsBase = require('../stats/base');

const StatFetcher = require('../../controllers/github-request/organization-stats');
const StatsCard = require('../../controllers/graphics/cards/organization-stats-card');

module.exports = class OrgGetApi extends StatsBase {

	get StatsCard() {
		return StatsCard;
	}

	async process() {

		const {
			cacheSeconds,
			colors,
			...queries
		} = this.formatQueries();

		this.setHeader('Content-Type', 'image/svg+xml');

		try {

			const orgStats = await StatFetcher.get(this.pathIds);

			if(orgStats.error) {
				this.logger.error(`Error getting Organization. ${orgStats.error}`);
				throw new Error('Cannot get Organization Data from Github');
			}

			const stats = this.formatStats(orgStats);

			this.logger.info('Organization Stats');
			this.logger.info(stats);

			const card = new this.StatsCard(stats, queries, colors);

			this.setHeader('Cache-Control', `public, max-age=${cacheSeconds}`);

			this.setBody(card.render());

		} catch(error) {

			const card = new this.ErrorCard({ width: queries.width },
				'Cannot build Organization\'s Card',
				error.message
			);

			this.setBody(card.render());
		}
	}

	formatStats({
		createdAt, name, login, location, ...stats
	}) {

		const createdToActualDate = new Date() - new Date(createdAt);

		return {
			name: name || login,
			location,
			totalMembers: stats.membersWithRole?.totalCount || 0,
			totalPackages: stats.packages?.totalCount || 0,
			totalProjects: stats.projects?.totalCount || 0,
			totalTeams: stats.teams?.totalCount || 0,
			totalRepositories: stats.repositories?.totalCount || 0,
			totalStars: this.countStars(stats?.repositories),
			miliSecondsActive: createdToActualDate
		};
	}
};
