'use strict';

const { handler } = require('vercel-serverless-api');

const API = require('../../src/apis/organization/get');

module.exports = async (...args) => handler(API, ...args);
