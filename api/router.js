'use strict';

const { Router } = require('vercel-serverless-routes');

module.exports = async (...args) => Router.link(...args);
