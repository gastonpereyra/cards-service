'use strict';

const { handler } = require('vercel-serverless-api');

const OrgRespositoryGetApi = require('../../../src/apis/organization/repository/get');

module.exports = async (...args) => handler(OrgRespositoryGetApi, ...args);
