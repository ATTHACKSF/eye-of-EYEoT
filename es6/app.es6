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

	_getDstrings(t1, t2, pattern) {
		var x11, y11, x12, y12, x21, x22, y21, y22;
		var g = Math.PI/100;
		var r = this.width/2;

		if(!pattern) pattern = '0,1';

		x11 = r * Math.sin(t1+g);
		y11 = r * Math.cos(t1+g);
		x12 = r * Math.sin(t1-g);
		y12 = r * Math.cos(t1-g);

		x21 = r * Math.sin(t2-g);
		y21 = r * Math.cos(t2-g);
		x22 = r * Math.sin(t2+g);
		y22 = r * Math.cos(t2+g);
		var d1 = 'M'+x11+','+y11+' A'+r+','+r+' 0 '+pattern+' '+x12+','+y12
					+ 'L'+x22+','+y22+' A'+r+','+r+' 0 '+pattern+' '+x21+','+y21
					+'z';

		//(x21, y21) -> (x11, y11)
		var d2 = 'M'+x21+','+y21+' A'+r+','+r+' 0 '+pattern+' '+x11+','+y11+'z';

		var delta1 = (Math.PI + t1 - t2)/2 + g;

		return [d1, d2, delta1];
	}
	showLidTired() {
		var canvas = this.canvas;
		var t1 = -Math.PI*1.3, t2 = -Math.PI/2;
		var ds = this._getDstrings(t1, t2);
		var d1 = ds[0], d2 = ds[1], delta1 = ds[2];

		canvas.append('path')
			.attr('d', d1)
				.transition()
				.delay(500)
				.duration(500)
				.attr('d', d => {
					var ds = this._getDstrings(t1-delta1, t2+delta1);
					var d1 = ds[0], d2 = ds[1];
					return d1;
				})
			;

		canvas.append('path')
			.attr('d', d2)
			.attr('class', 'lidbody')
				.transition()
				.delay(500)
				.duration(500)
				.attr('d', d => {
					var ds = this._getDstrings(t1-delta1, t2+delta1);
					var d1 = ds[0], d2 = ds[1];
					return d2;
				})
		;
	}

}

var c = new Eyes();
c.init();
