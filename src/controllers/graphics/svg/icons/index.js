'use strict';

const commits = require('./commits');
const contributions = require('./contributions');
const forks = require('./forks');
const icon = require('./icon');
const issues = require('./issues');
const members = require('./members');
const packages = require('./packages');
const projects = require('./projects');
const prs = require('./prs');
const repositories = require('./repositories');
const teams = require('./teams');
const stars = require('./stars');

module.exports = {
	commits,
	contributions,
	discussions: contributions,
	forks,
	icon,
	issues,
	followers: teams,
	members,
	packages,
	projects,
	prs,
	repositories,
	teams,
	stars
};
