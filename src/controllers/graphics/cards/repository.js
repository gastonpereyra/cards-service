'use strict';

const toEmoji = require('emoji-name-map');

const Card = require('./base');
const icons = require('../svg/icons');

const encodeHTML = require('../../utils/encode-HTML');
const kFormatter = require('../helpers/k-formatter');
const multilineWrapper = require('../helpers/multiline-wrapper');

module.exports = class RepositoryStatsCard extends Card {

	constructor(
		{
			name,
			nameWithOwner,
			description = '...',
			language,
			isArchived,
			isTemplate,
			starsCount,
			forkCount
		} = {},
		{
			hideBorder = false,
			hideTitle = false,
			showOwner = true,
			width = 400,
			lineHeight = 10
		} = {},
		colors
	) {

		const descriptionWithEmojis = description.replace(/:\w+:/gm, emoji => toEmoji.get(emoji) || '');
		const descriptionFormatted = multilineWrapper(descriptionWithEmojis, width);

		const height = (descriptionFormatted.length > 1 ? 120 : 110) + descriptionFormatted.length * lineHeight;

		super({
			title: showOwner ? nameWithOwner : name,
			titlePrefixIcon: icons.repositories,
			width,
			height,
			colors
		});

		this.disableAnimations();
		this.setHideBorder(hideBorder);
		this.setHideTitle(hideTitle);
		this.setCSS(this.getStyles());

		this.language = language;
		this.description = descriptionFormatted;

		this.totals = {
			stars: kFormatter(starsCount),
			forks: kFormatter(forkCount)
		};

		this.isTemplate = isTemplate;
		this.isArchived = isArchived;
	}

	getStyles() {
		return `
        .description { font: 400 13px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${this.colors.textColor} }
        .gray { font: 400 12px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${this.colors.textColor} }
        .icon { fill: ${this.colors.iconColor} }
        .badge { font: 600 11px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${this.colors.textColor} }
        .badge rect { opacity: 0.2 }
      `;
	}

	render() {

		const shiftText = this.language.name.length > 15 ? 0 : 30;

		const templateBadge = this.isTemplate ? this.getBadgeSVG('Template') : '';
		const archivedBadge = (this.isArchived && !this.isTemplate) ? this.getBadgeSVG('Archived') : '';

		const starAndForkCount = this.flexLayout({
			items: [this.getSvgStars(), this.getSvgForks()],
			gap: 65
		}).join('');

		return super.render(`
        ${templateBadge || archivedBadge}
        <text class="description" x="25" y="-5">
          ${this.getDescription()}
        </text>
        <g transform="translate(0, ${this.height - 75})">
          ${this.getSvgLanguage()}
          <g
            data-testid="star-fork-group"
            transform="translate(${155 - shiftText}, 0)"
          >
            ${starAndForkCount}
          </g>
        </g>
      `);
	}

	getDescription() {
		return this.description
			.map(line => `<tspan dy="1.2em" x="25">${encodeHTML(line)}</tspan>`)
			.join('');
	}

	getBadgeSVG(label) {

		const posX = this.width * 0.85;

		return `
        <g data-testid="badge" class="badge" transform="translate(${posX}, 43)">
          <rect stroke="${this.colors.titleColor}" stroke-width="1" width="70" height="20" x="-12" y="-14" ry="10" rx="10"></rect>
          <text
            x="23" y="-5"
            alignment-baseline="central"
            dominant-baseline="central"
            text-anchor="middle"
            fill="${this.colors.textColor}"
          >
            ${label}
          </text>
        </g>
      `;
	}

	getSvgLanguage() {
		return `
        <g data-testid="primary-lang" transform="translate(30, 0)">
          <circle data-testid="lang-color" cx="0" cy="-5" r="6" fill="${this.language.color}" />
          <text data-testid="lang-name" class="gray" x="15">${this.language.name}</text>
        </g>
        `;
	}

	getSvgForks() {
		return this.formatIconWithLabel(icons.forks, this.totals.forks, 'forkcount');
	}

	getSvgStars() {
		return this.formatIconWithLabel(icons.stars, this.totals.stars, 'stargazers');
	}

	formatIconWithLabel(icon, label, testid) {
		return `
        <svg class="icon" y="-12" viewBox="0 0 16 16" version="1.1" width="16" height="16">
          ${icon}
        </svg>
        <text data-testid="${testid}" class="gray" x="25">${label}</text>
      `;
	}
};
