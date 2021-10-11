'use strict';

module.exports = `
fragment RepoInfo on Repository {
  name
  nameWithOwner
  isPrivate
  isArchived
  isTemplate
  stargazers {
    totalCount
  }
  description
  primaryLanguage {
    color
    id
    name
  }
  forkCount
}
`;
