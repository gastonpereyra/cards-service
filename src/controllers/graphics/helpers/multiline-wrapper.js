'use strict';

const wrap = require('word-wrap');

const encodeHTML = require('../../utils/encode-HTML');

module.exports = (text, width = 60, maxLines = 3) => {
	const wrapped = wrap(encodeHTML(text), { width })
		.split('\n') // Split wrapped lines to get an array of lines
		.map(line => line.trim()); // Remove leading and trailing whitespace of each line

	const lines = wrapped.slice(0, maxLines); // Only consider maxLines lines

	// Add "..." to the last line if the text exceeds maxLines
	if(wrapped.length > maxLines)
		lines[maxLines - 1] += '...';

	// Remove empty lines if text fits in less than maxLines lines
	return lines.filter(Boolean);
};
