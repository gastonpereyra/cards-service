
'use strict';

const encodeHTML = require('../../utils/encode-HTML');
const kFormatter = require('../helpers/k-formatter');

const icons = require('../svg/icons');
const Card = require('./base');

const fundationTime = new Date() - new Date('2008-02-08T00:00:00.000Z'); // GITHUB FUNDATION DATE
const YEAR_IN_MILISECONDS = 1000 * 60 * 60 * 24 * 360;

module.exports = class StatsCard extends Card {

	constructor(
		{
			name = 'Octocat',
			miliSecondsActive = 0,
			...stats
		} = {},
		{
			hide = [],
			showIcons = true,
			hideTitle = false,
			hideBorder = false,
			hideYear = false,
			lineHeight = 25,
			width = 460
		} = {},
		colors = {},
		maxStats = 5
	) {

		const height = Math.max(45 + ((maxStats + 1) - hide.length) * lineHeight, hideYear ? 0 : 150);
		const apostrophe = ['x', 's'].includes(name.slice(-1)) ? '' : 's';

		super({
			title: `${encodeHTML(name)}'${apostrophe} Stats`,
			width: (hide.length !== 5 || !hideTitle) ? width : 140,
			height,
			colors
		});

		this.lineHeight = lineHeight;
		this.hideYear = hideYear;
		this.hide = hide;
		this.showIcons = showIcons;

		this.totals = this.getTotals?.(stats) || {};

		this.yearsActive = miliSecondsActive / YEAR_IN_MILISECONDS;

		const cssStyles = this.getStyles({
			titleColor: this.colors.titleColor,
			textColor: this.colors.textColor,
			iconColor: this.colors.iconColor,
			showIcons,
			progress: (100 * miliSecondsActive) / fundationTime
		});

		this.setHideBorder(hideBorder);
		this.setHideTitle(hideTitle);
		this.setCSS(cssStyles);
	}

	getStyles({ showIcons, progress }) {
		return `
      .stat {
        font: 600 14px 'Segoe UI', Ubuntu, "Helvetica Neue", Sans-Serif; fill: ${this.colors.textColor};
      }
      .stagger {
        opacity: 0;
        animation: fadeInAnimation 0.3s ease-in-out forwards;
      }
      .rank-text {
        font: 800 24px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${this.colors.titleColor}; 
        animation: scaleInAnimation 0.3s ease-in-out forwards;
      }
      
      .bold { font-weight: 700 }
      .icon {
        fill: ${this.colors.iconColor};
        display: ${showIcons ? 'block' : 'none'};
      }
      
      .rank-circle-rim {
        stroke: ${this.colors.iconColor};
        fill: none;
        stroke-width: 6;
        opacity: 0.2;
      }
      .rank-circle {
        stroke: ${this.colors.iconColor};
        stroke-dasharray: 250;
        fill: none;
        stroke-width: 6;
        stroke-linecap: round;
        opacity: 0.8;
        transform-origin: -10px 8px;
        transform: rotate(-90deg);
        animation: rankAnimation 1s forwards ease-in-out;
      }
      ${this.getProgressAnimation({ progress })}
    `;
	}

	getProgressAnimation({ progress }) {
		return `
      @keyframes rankAnimation {
        from {
          stroke-dashoffset: ${this.calculateCircleProgress(0)};
        }
        to {
          stroke-dashoffset: ${this.calculateCircleProgress(progress)};
        }
      }
    `;
	}

	calculateCircleProgress(value) {

		if(value < 0)
			value = 0;

		else if(value > 100)
			value = 100;

		return ((100 - value) / 100) * (Math.PI * 80);
	}

	render() {

		const statItems = this.generateStats();
		const rankCircle = this.generateCircule();

		const layout = this.flexLayout({
			items: statItems,
			gap: this.lineHeight,
			direction: 'column'
		});

		return super.render(`
      ${rankCircle}
      <svg x="0" y="0">
        ${layout.join('')}
      </svg> 
    `);

	}

	generateStats() {

		return Object.entries(this.totals)
			.filter(([key]) => !this.hide.includes(key))
			.map(([key, value], index) => this.createTextNode({
				icon: icons[key] || icons.icon,
				label: `Total ${key}`,
				value,
				id: key
			}, index));
	}

	createTextNode({
		icon,
		label,
		value,
		id
	}, index) {

		return `
        <g class="stagger" style="animation-delay: ${(index + 3) * 150}ms" transform="translate(${this.width / 18.4}, 0)">
          ${this.getSvgIcon(icon)}
          <text class="stat bold" ${this.showIcons ? 'x="25"' : ''} y="12.5">${label}:</text>
          <text 
            class="stat" 
            x="${this.showIcons ? 200 : 170}" 
            y="12.5" 
            data-testid="${id}"
          >${kFormatter(value)}</text>
        </g>
      `;
	}

	getSvgIcon(icon) {
		return !this.showIcons
			? '' : `
      <svg data-testid="icon" class="icon" viewBox="0 0 16 16" version="1.1" width="16" height="16">
        ${icon}
      </svg>
    `;
	}

	generateCircule() {

		const level = this.formatYear();

		const posY = this.height / 2 - (!this.hideTitle ? 50 : 35);
		const posX = this.hide.length !== 5 ? this.width * 0.85 : 80;

		return this.hideYear ? ''
			: `<g data-testid="rank-circle" 
            transform="translate(${posX}, ${posY})">
          <circle class="rank-circle-rim" cx="-10" cy="8" r="40" />
          <circle class="rank-circle" cx="-10" cy="8" r="40" />
          <g class="rank-text">
            <text
              x="-4"
              y="0"
              alignment-baseline="central"
              dominant-baseline="central"
              text-anchor="middle"
            >
              ${level}
            </text>
          </g>
        </g>`;
	}

	formatYear() {

		if(this.yearsActive < 0.7)
			return '>1Y';

		const [year, months] = this.yearsActive.toString().split('.');

		switch(Number(months[0])) {
			case (4):
			case (5):
			case (6):
				return `${year}+Y`;
			case (7):
			case (8):
			case (9):
				return `~${Number(year) + 1}Y`;
			case (0):
			case (1):
			case (2):
			case (3):
			default:
				return `${year}Y`;
		}
	}
};
