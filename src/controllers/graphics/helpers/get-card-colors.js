'use strict';

const addColor = require('./add-color');

const themes = require('../themes');

module.exports = ({
	title,
	text,
	icon,
	background,
	theme,
	fallbackTheme = 'dark'
}) => {
	const defaultTheme = themes[fallbackTheme];
	const selectedTheme = themes[theme] || defaultTheme;

	return {
		titleColor: addColor(
			title || selectedTheme.titleColor,
			'#' + defaultTheme.titleColor
		),
		iconColor: addColor(
			icon || selectedTheme.iconColor,
			'#' + defaultTheme.iconColor
		),
		textColor: addColor(
			text || selectedTheme.textColor,
			'#' + defaultTheme.textColor
		),
		bgColor: addColor(
			background || selectedTheme.backgroundColor,
			'#' + defaultTheme.backgroundColor
		)
	};
};
