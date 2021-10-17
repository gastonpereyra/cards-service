'use strict';

const StatsBase = require('../stats/base');

const UserStatFetcher = require('../../controllers/github-request/user-stats');
const CommitsFetcher = require('../../controllers/github-request/commits');

const StatsCard = require('../../controllers/graphics/cards/user-stats-card');

module.exports = class UserGetApi extends StatsBase {

	get StatsCard() {
		return StatsCard;
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
				this.logger.error(`Error getting User. ${userStats.error}`);
				throw new Error('Cannot get User Data from Github');
			}

			if(totalCommits.error)
				this.logger.error(`Error getting Extra Commits. ${totalCommits.error}`);

			const stats = this.formatStats(userStats, totalCommits);

			this.logger.info('User Stats');
			this.logger.info(stats);

			const card = new this.StatsCard(stats, queries, colors);

			this.setHeader('Cache-Control', `public, max-age=${cacheSeconds}`);

			this.setBody(card.render());

		} catch(error) {

			const card = new this.ErrorCard({ width: queries.width },
				'Cannot build User\'s Card',
				error.message
			);

			this.setBody(card.render());
		}
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
};
