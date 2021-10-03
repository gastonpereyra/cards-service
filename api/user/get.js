'use strict';

const { handler } = require('vercel-serverless-api');

const UserGetApi = require('../../src/apis/user/get');

module.exports = async (...args) => handler(UserGetApi, ...args);
