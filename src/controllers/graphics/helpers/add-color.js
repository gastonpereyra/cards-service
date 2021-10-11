'use strict';

const isValidHexColor = require('./color-validator');

module.exports = (color, defaultColor) => (isValidHexColor(color) && `#${color}`) || defaultColor;
