'use strict';

module.exports = `
query userInfo($login: String!) {
  user(login: $login) {
	name
	login
	createdAt
	contributionsCollection {
	  totalCommitContributions
	  restrictedContributionsCount
	}
	repositoriesContributedTo(first: 1, contributionTypes: [COMMIT, ISSUE, PULL_REQUEST, REPOSITORY]) {
	  totalCount
	}
	pullRequests(first: 1) {
	  totalCount
	}
	issues(first: 1) {
	  totalCount
	}
	followers {
	  totalCount
	}
	repositories(first: 100, ownerAffiliations: OWNER, isFork: false, orderBy: {direction: DESC, field: STARGAZERS}) {
	  totalCount
	  nodes {
		stargazers {
		  totalCount
		}
	  }
	}
  }
}
`;
