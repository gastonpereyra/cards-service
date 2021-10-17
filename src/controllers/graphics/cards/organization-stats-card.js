
'use strict';

const StatCard = require('./stats-card');

module.exports = class OrganizationStatsCard extends StatCard {

	static get statsNames() {
		return ['stars', 'members', 'teams', 'projects', 'packages', 'repositories'];
	}

	constructor(...args) {
		super(...args, 6);
	}

	getTotals({
		totalStars = 0,
		totalMembers = 0,
		totalTeams = 0,
		totalProjects = 0,
		totalPackages = 0,
		totalRepositories = 0
	}) {
		return {
			stars: totalStars,
			members: totalMembers,
			teams: totalTeams,
			projects: totalProjects,
			repositories: totalRepositories,
			packages: totalPackages
		};
	}
};
