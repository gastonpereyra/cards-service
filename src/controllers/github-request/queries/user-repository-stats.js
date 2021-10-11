'use strict';

const repositoryFragment = require('./fragments/repository');

module.exports = `
${repositoryFragment}
query getRepo($login: String!, $repo: String!) {
  user(login: $login) {
    repository(name: $repo) {
      ...RepoInfo
    }
  }
}
`;
