// 'use strict';
import console from 'console';
import d3 from 'd3';

/**
 */

class Eyes {
	constructor() {
	}
	init() {
		this.canvas = d3.select('#canvas')
			.append('svg')
				.attr('width', 400)
				.attr('height', 400)
			.append('g')
				.attr('transform', 'translate(200, 200)');

		this.showNomalEye();
		this.showEyeLight();
		this.showLidTired();
	}

	showNomalEye() {
		var canvas = this.canvas;
		// base
		canvas
			.append('circle')
				.attr('r', 200)
				.attr('class', 'base');

		// black
		canvas
			.append('circle')
				.attr('r', 150)
				.attr('cx', 0)
				.attr('cy', 30)
				.attr('class', 'black')
	}

	showEyeLight() {
		var canvas = this.canvas;
		canvas
			.append('circle')
				.attr('r', 33)
				.attr('cx', 100)
				.attr('cy', 50)
				.attr('class', 'eyelight')

	}

	showLidTired() {
		var canvas = this.canvas;
		canvas
			.append('line')
				.attr('x1', -200)
				.attr('y1', 0)
				.attr('x2', 340)
				.attr('y2', -70)
				.attr('class', 'lidline')
				;
	}

}

var c = new Eyes();
c.init();
