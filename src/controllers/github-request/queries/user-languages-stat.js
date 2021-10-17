'use strict';

const languagesFragment = require('./fragments/languages');

module.exports = `
query userInfo($login: String!) {
  user(login: $login) {
    ${languagesFragment}
  }
}
`;
