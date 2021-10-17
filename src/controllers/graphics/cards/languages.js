'use strict';

const clampValue = require('../../utils/clamp-value');

const Card = require('./base');

const MIN_WIDTH = 300;
const MIN_HEIGHT = 45;
const COLUMN_WIDTH = 150;
const COLUMN_HEIGHT = 25;
const DEFAULT_COLOR = '#858585';


module.exports = class LanguageCard extends Card {

	constructor(
		languages,
		{
			hideTitle = false,
			hideBorder = false,
			width = MIN_WIDTH,
			lineHeight = COLUMN_HEIGHT,
			hide = [],
			isCompact = false
		} = {},
		colors
	) {
		super({
			title: 'Ranking Languages',
			width,
			height: MIN_HEIGHT,
			colors
		});

		this.disableAnimations();
		this.setHideBorder(hideBorder);
		this.setHideTitle(width < MIN_WIDTH ? true : hideTitle);
		this.setCSS(this.getStyles());

		this.languages = Object.values(languages)
			.filter(({ name }) => !hide.includes(name.toLowerCase()))
			.sort((a, b) => b.size - a.size);

		this.isCompact = isCompact;
		this.lineHeight = lineHeight;
	}

	getStyles() {
		return `
		.lang-name { font: 400 11px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${this.colors.textColor} }
		.lang-percentage { font: 400 11px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${this.colors.iconColor} }
	  `;
	}

	render() {

		const totalSize = this.languages.reduce((acc, { size }) => acc + size, 0);

		const layout = this.isCompact ? this.createCompactLayout(totalSize) : this.createLayout(totalSize);

		return super.render(`
    <svg data-testid="lang-items" x="25">
      ${layout}
    </svg>
  `);
	}

	createLayout(totalSize) {

		this.height += (this.languages.length + 1) * 40;

		return this.flexLayout({
			items: this.languages.map(({ size, name, color = '#858585' }) => {
				return this.createProgressNode({
					name,
					color,
					progress: ((size / totalSize) * 100).toFixed(2)
				});
			}),
			gap: 40,
			direction: 'column'
		}).join('');
	}

	createProgressNode({ color, name, progress }) {

		const paddingRight = 95;
		const progressTextX = this.width - paddingRight + 10;
		const progressWidth = this.width - paddingRight;
		const progressPercentage = clampValue(progress, 2, 100);

		return `
		<text data-testid="lang-name" x="2" y="15" class="lang-name">${name}</text>
		<text x="${progressTextX}" y="34" class="lang-percentage">${progress}%</text>
		<svg width="${progressWidth}">
		  <rect rx="5" ry="5" x="0" y="25" width="${progressWidth}" height="8" fill="#ddd"></rect>
		  <rect
			height="8"
			fill="${color}"
			rx="5" ry="5" x="0" y="25"
			data-testid="lang-progress"
			width="${progressPercentage}%"
		  >
		  </rect>
		</svg>
	  `;
	}

	createCompactLayout(totalSize) {

		const { bar, width } = this.createCompactProgressBar(totalSize);

		let columns = Math.floor(width / COLUMN_WIDTH);

		if(columns * COLUMN_WIDTH > this.width)
			columns--;

		this.height += 22.5 + Math.ceil(this.languages.length / columns + 1) * this.lineHeight;

		return `
		  <mask id="rect-mask">
			<rect x="0" y="0" width="${this.width - 50}" height="8" fill="white" rx="5" />
		  </mask>
		  ${bar}
		  ${this.createLanguageTextNode({ totalSize, columns }).join('')}
		`;
	}

	createCompactProgressBar(totalSize) {

		let progressOffset = 0;
		let width = 0;

		return {
			bar: this.languages.map(lang => {

				const percentage = ((lang.size / totalSize) * (this.width - 50)).toFixed(2);
				const progress = percentage < 10 ? parseFloat(percentage) + 10 : percentage;

				width += Number(progress);

				const output = `
				  <rect
					mask="url(#rect-mask)" 
					data-testid="lang-progress"
					x="${progressOffset}" 
					y="0"
					width="${progress}" 
					height="8"
					fill="${lang.color || DEFAULT_COLOR}"
				  />
				`;
				progressOffset += parseFloat(percentage);
				return output;
			}).join(''),
			width
		};
	}

	createLanguageTextNode({ totalSize, x = 0, columns }) {

		const colQty = Array(columns).fill(0);

		return this.languages.map((lang, index) => {

			const newY = this.lineHeight * colQty[index % columns] + this.lineHeight;
			colQty[index % columns]++;

			return this.createCompactLangNode({
				lang,
				x: (COLUMN_WIDTH * (index % columns)) + x,
				y: newY,
				totalSize,
				index
			});
		});
	}

	createCompactLangNode({ lang, totalSize, x, y }) {

		const percentage = ((lang.size / totalSize) * 100).toFixed(2);
		const color = lang.color || DEFAULT_COLOR;

		return `
		<g transform="translate(${x}, ${y})">
		  <circle cx="5" cy="6" r="5" fill="${color}" />
		  <text data-testid="lang-name" x="15" y="10" class="lang-name">
			${lang.name} <tspan class="lang-percentage">(${percentage}%)</tspan>
		  </text>
		</g>
	  `;
	}
};
