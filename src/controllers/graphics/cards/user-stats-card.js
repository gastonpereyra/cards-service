
'use strict';

const StatCard = require('./stats-card');

module.exports = class UserStatsCard extends StatCard {

	static get statsNames() {
		return ['stars', 'commits', 'issues', 'prs', 'contributions'];
	}

	getTotals({
		totalStars = 0,
		totalCommits = 0,
		totalIssues = 0,
		totalPRs = 0,
		contributedTo = 0
	}) {
		return {
			stars: totalStars,
			commits: totalCommits,
			issues: totalIssues,
			prs: totalPRs,
			contributions: contributedTo
		};
	}
};
