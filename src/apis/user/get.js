'use strict';

const { API } = require('vercel-serverless-api');
const { struct } = require('superstruct');

const UserStatFetcher = require('../../controllers/github-request/user-stats');
const CommitsFetcher = require('../../controllers/github-request/commits');

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
			hideRank: 'string?',
			showIcons: 'string?',
			countPrivate: 'string?',
			includeAlCommits: 'string?',
			lineHeight: 'string?',
			titleColor: 'string?',
			iconColor: 'string?',
			textColor: 'string?',
			backgroundColor: 'string?',
			cacheSeconds: 'string?'
		});
	}

	async process() {

		const [userStats, totalCommits] = await Promise.all([
			UserStatFetcher.get(this.pathIds.username),
			CommitsFetcher.get(this.pathIds.username)
		]);

		if(userStats.error || totalCommits.error)
			logger.error(userStats.error || totalCommits.error);

		const stats = {
			name: userStats.name || userStats.login,
			totalPRs: userStats.pullRequests.totalCount,
			totalCommits: this.countCommits(userStats.contributionsCollection, totalCommits),
			totalIssues: userStats.issues.totalCount,
			totalStars: this.countStars(userStats.repositories),
			contributedTo: userStats.repositoriesContributedTo.totalCount,
			rank: { level: 'C', score: 0 }
		};

		this.setBody(stats);
	}

	formatQueries() {
		return {
			hide: !this.query.hide ? [] : this.query.hide.split(','),
			hideTitle: Boolean(this.query.hideTitle),
			hideBorder: Boolean(this.query.hideBorder),
			hideRank: Boolean(this.query.hideRank),
			showIcons: Boolean(this.query.showIcons),
			countPrivate: Boolean(this.query.countPrivate),
			includeAlCommits: Boolean(this.query.includeAlCommits),
			lineHeight: this.query.lineHeight,
			colors: {
				title: this.query.titleColor,
				icon: this.query.iconColor,
				text: this.query.textColor,
				background: this.query.backgroundColor
			},
			cacheSeconds: Number(this.query.cacheSeconds || THIRTY_MINUTES)
		};
	}

	countCommits({ totalCommitContributions = 0, restrictedContributionsCount = 0 }, totalCommits = 0) {
		return totalCommits + totalCommitContributions + restrictedContributionsCount;
	}

	countStars({ nodes }) {
		return nodes.reduce((prev, { stargazers }) => {
			return prev + stargazers.totalCount;
		}, 0);
	}
};
