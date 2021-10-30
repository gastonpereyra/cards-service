'use strict';

const { handler } = require('vercel-serverless-api');
const { CannotFoundAPI } = require('vercel-serverless-routes');

module.exports = async (...args) => handler(CannotFoundAPI, ...args);
