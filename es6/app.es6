// 'use strict';
import console from 'console';
import d3 from 'd3';

/**
 */

class Eyes {
	constructor() {
	}
	init() {
		this.width = 400;
		this.height = 400;
		this.canvas = d3.select('#canvas')
			.append('svg')
				.attr('width', this.width)
				.attr('height', this.height)
			.append('g')
				.attr('transform', 'translate('+this.width/2+', '+this.height/2+')');

		this.showNomalEye();
		this.showEyeLight();
		this.showLidTired();
	}

	showNomalEye() {
		var canvas = this.canvas;
		// base
		canvas
			.append('circle')
				.attr('r', this.width/2)
				.attr('class', 'base');

		// black
		canvas
			.append('circle')
				.attr({
					r: 150,
					cx: 0,
					cy: 30,
					class: 'black'
				});
	}

	showEyeLight() {
		var canvas = this.canvas;
		var cx_right = 98;
		var cx_left = 106;
		canvas
			.append('circle')
				.attr({
					r: 33,
					cx: 100,
					cy: 50,
					class: 'eyelight'
				});
		repeat();
		function repeat(){
			d3.select('.eyelight')
				.transition()
				.duration(1200)
				.ease("linear")
				.attr("cx", cx_left)
				.transition()
				.duration(1200)
				.ease("linear")
				.attr("cx", cx_right)
				.each("end", repeat);
		}
	}

	showLidTired() {
		var canvas = this.canvas;
		var x1, y1, x2, y2;
		var t1 = -Math.PI*1.3, t2 = -Math.PI/2, r = this.width/2;

		x1 = r * Math.sin(t1);
		y1 = r * Math.cos(t1);
		x2 = r * Math.sin(t2);
		y2 = r * Math.cos(t2);

		canvas
			.append('line')
				.attr({
					x1: x1,
					y1: y1,
					x2: x2,
					y2: y2,
					class: 'lidline'
				})
				;
	}

}

var c = new Eyes();
c.init();
