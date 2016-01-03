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
		canvas
			.append('circle')
				.attr({
					r: 33,
					cx: 100,
					cy: 50,
					class: 'eyelight'
				});

	}

	showLidTired() {
		var canvas = this.canvas;
		var x11, y11, x12, y12, x21, x22, y21, y22;
		var t1 = -Math.PI*1.3, t2 = -Math.PI/2, r = this.width/2;
		var g = Math.PI/100;

		x11 = r * Math.sin(t1+g);
		x12 = r * Math.sin(t1-g);
		y11 = r * Math.cos(t1+g);
		y12 = r * Math.cos(t1-g);

		x21 = r * Math.sin(t2-g);
		x22 = r * Math.sin(t2+g);
		y21 = r * Math.cos(t2-g);
		y22 = r * Math.cos(t2+g);

		var d1 = 'M'+x11+','+y11+' A'+r+','+r+' 0 0,1 '+x12+','+y12
					+ 'L'+x22+','+y22+' A'+r+','+r+' 0 0,1 '+x21+','+y21
					+'z';
		canvas.append('path')
			.attr('d', d1);

		//(x21, y21) -> (x11, y11)
		var d2 = 'M'+x21+','+y21+' A'+r+','+r+' 0 0,1 '+x11+','+y11+'z';
		canvas.append('path')
			.attr('d', d2)
			.attr('class', 'lidbody');
		// x1 = r * Math.sin(t1);
		// y1 = r * Math.cos(t1);
		// x2 = r * Math.sin(t2);
		// y2 = r * Math.cos(t2);
		//
		// canvas
		// 	.append('line')
		// 		.attr({
		// 			x1: x1,
		// 			y1: y1,
		// 			x2: x2,
		// 			y2: y2,
		// 			class: 'lidline'
		// 		})
		// 		;
	}

}

var c = new Eyes();
c.init();
