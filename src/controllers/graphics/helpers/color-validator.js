'use strict';

const colorRegEx = new RegExp(/^([A-Fa-f0-9]{8}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{3}|[A-Fa-f0-9]{4})$/);

module.exports = hexColor => colorRegEx.test(hexColor);
