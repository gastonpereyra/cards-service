'use strict';

module.exports = `
query organizationInfo($login: String!) {
	organization(login: $login) {
	name
	login
	createdAt
	location 
	membersWithRole (first: 100) {
		totalCount
	}
	packages (first: 100) {
		totalCount
	}
	projects (first: 100) {
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
	teams (first: 100) {
		totalCount
	}
  }
}
`;
