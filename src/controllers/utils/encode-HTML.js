'use strict';

module.exports = str => str
	.replace(/[\u00A0-\u9999<>&](?!#)/gim, i => {
		return '&#' + i.charCodeAt(0) + ';';
	})
// eslint-disable-next-line no-control-regex
	.replace(/\u0008/gim, '');
