'use strict';

const Card = require('./base');

const encodeHTML = require('../../utils/encode-HTML');
const multilineWrapper = require('../helpers/multiline-wrapper');
const icon = require('../svg/icons/error');

module.exports = class ErrorCard extends Card {

	constructor({ width = 495 }, message, description) {

		const messageFormmated = message ? multilineWrapper(message, Math.floor(width * 0.12), 1) : [];
		const descriptionFormmated = description ? multilineWrapper(description, Math.floor(width * 0.184), 4) : [];

		super({
			title: 'Something went Wrong!',
			width,
			height: 60 + messageFormmated.length * 22 + descriptionFormmated.length * 25,
			titlePrefixIcon: icon,
			colors: {
				theme: 'error'
			}
		});

		this.message = messageFormmated;
		this.description = descriptionFormmated;

		this.setCSS(this.getStyles());
	}

	getStyles() {
		return `
    .text { fill: ${this.colors.textColor}; }
    .big {
      font: 600 16px 'Segoe UI', Ubuntu, Sans-Serif;
      animation: fadeInAnimation 1.8s ease-in-out forwards;
    }
    .small {
      font: 600 12px 'Segoe UI', Ubuntu, Sans-Serif;
      animation: fadeInAnimation 3.8s ease-in-out forwards;
    }
    .icon {
      fill: ${this.colors.iconColor};
      display: block';
    }
    `;
	}

	render() {

		return super.render(`
    <svg x="0" y="0">
      <g transform="translate(${this.width / 18.4}, 0)">
        <text data-testid="message-title" class="text big" y="12.5">
          ${this.message}
        </text>
      </g>
      <g transform="translate(${this.width / 18.4}, 15)">
        <text data-testid="message-error" class="text small" y="12.5">
          ${this.description.map(line => `<tspan dy="1.2em" x="0">${encodeHTML(line)}</tspan>`).join('')}
        </text>
      </g>
    </svg> 
  `);
	}
};
