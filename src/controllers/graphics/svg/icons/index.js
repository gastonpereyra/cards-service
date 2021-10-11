'use strict';

const commits = require('./commits');
const contributions = require('./contributions');
const forks = require('./forks');
const icon = require('./icon');
const issues = require('./issues');
const prs = require('./prs');
const stars = require('./stars');

module.exports = {
	commits,
	contributions,
	forks,
	icon,
	issues,
	prs,
	stars
};
