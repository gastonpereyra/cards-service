'use strict';

const languagesFragment = require('./fragments/languages');

module.exports = `
query orgInfo($login: String!) {
  organization(login: $login) {
    ${languagesFragment}
  }
}
`;
