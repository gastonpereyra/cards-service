'use strict';

const addColor = require('./add-color');

const themes = require('../themes');

module.exports = ({
	titleColor,
	textColor,
	iconColor,
	backgroundColor,
	theme,
	fallbackTheme = 'dark'
}) => {
	const defaultTheme = themes[fallbackTheme];
	const selectedTheme = themes[theme] || defaultTheme;

	return {
		titleColor: addColor(
			titleColor || selectedTheme.titleColor,
			'#' + defaultTheme.titleColor
		),
		iconColor: addColor(
			iconColor || selectedTheme.iconColor,
			'#' + defaultTheme.iconColor
		),
		textColor: addColor(
			textColor || selectedTheme.textColor,
			'#' + defaultTheme.textColor
		),
		bgColor: addColor(
			backgroundColor || selectedTheme.backgroundColor,
			'#' + defaultTheme.backgroundColor
		)
	};
};
