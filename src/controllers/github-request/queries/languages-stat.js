'use strict';

module.exports = `
query userInfo($login: String!) {
  user(login: $login) {
    # fetch only owner repos & not forks
    repositories(ownerAffiliations: OWNER, isFork: false, first: 100) {
      nodes {
        languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
          edges {
            size
            node {
              color
              name
            }
          }
        }
      }
    }
  }
}
`;
