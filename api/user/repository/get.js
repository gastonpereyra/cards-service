'use strict';

const { handler } = require('vercel-serverless-api');

const UserRespositoryGetApi = require('../../../src/apis/user/repository/get');

module.exports = async (...args) => handler(UserRespositoryGetApi, ...args);
