// 'use strict';
import console from 'console';
import d3 from 'd3';

/**
 */

class Eyes {
	constructor() {
	}
	init() {
		this.width = 360;
		this.height = 360;
		this.r = this.width / 2;
		this.canvas = d3.select('#canvas')
			.append('svg')
				.attr('width', this.width)
				.attr('height', this.height)
			.append('g')
				.attr('transform', 'translate('+this.width/2+', '+this.height/2+')');

		this.showLidTired();
		var that = this;
		// this.canvas.on('click', () => {
		// 	that.showNomalEye();
		// });
		this.index = 0;
		this.face_status = 'showLidTired';
		d3.select('#canvas').on('click', () => {
			that.showNomalEye();
			var arr = ['kya', 'showNomalEye', 'curious', 'showWink', 'showLidTired'];
			//that.kya();
			// that.showNomalEye();
			//that.curious();
			//that.showWink();
			var face_status = arr[that.index%5];
			that[face_status]();
			that.index++;
			that.face_status = face_status;
		});
		this.detectDeviceMotion();

		document.getElementById('btn').addEventListener("click", function(e){
			e.preventDefault();
			console.log(e);
			startRecording (function(data){
				that.curious();
			});
		});
	}


	showEyeBase() {
		var canvas = this.canvas;
		// base
		canvas
			.append('circle')
				.attr('r', this.width/2)
				.attr('class', 'base');

	}

	resetEye(successCallback) {
		var canvas = this.canvas;
		canvas
			.attr('opacity', 1)
			.transition()
			.duration(500)
			.attr('opacity', 0)
			.each('end', () => {
				canvas.html('');
				successCallback();
			})
	}

	curious() {
		var that = this;
		var canvas = that.canvas;
		this.resetEye(() => {
			canvas.attr('opacity', 1);
			that.showEyeBase();

			// black
			var theta1 = Math.PI / 4;
			var theta2 = -theta1;
			var x1, y1, x2, y2;
			var r = 150;
			x1 = r * Math.sin(theta1);
			y1 = r * Math.cos(theta1);
			x2 = r * Math.sin(theta2);
			y2 = r * Math.cos(theta2);

			var d1 = 'M'+x1+','+y1+' A'+r+','+r+' 0 1,0 '+x2+','+y2
							 +' A150,150 0 0,1 '+x1+','+y1
			;

			canvas.append('path').attr('d', d1);
			canvas.append('circle')
				.attr('cx', -70)
				.attr('cy', -70)
				.attr('r', 50)
				.attr('class', 'eyelight_curious')
				.attr('fill', '#dddddd');
			that.showBrow();

			repeat();
			function repeat(){
				d3.select('.eyelight_curious')
					.transition()
					.duration(1200)
					.ease("linear")
					.attr("cx", -70)
					.transition()
					.duration(1200)
					.ease("linear")
					.attr("cx", -62)
					.each("end", repeat);
			}

		});
	}

	kya() {
		var that = this;
		var canvas = that.canvas;
		this.resetEye(() => {
		canvas.attr('opacity', 1);
		that.showEyeBase();

		// kya
		canvas.append('line')
			.attr({
				x1: -50,
				y1: -170,
				x2: 170,
				y2: 10,
				class: 'kya'
			});
		canvas.append('line')
			.attr({
				x1: -170,
				y1: -30,
				x2: 170,
				y2: 10,
				class: 'kya'
			});
		canvas.append('line')
			.attr({
				x1: -60,
				y1: 150,
				x2: 170,
				y2: 10,
				class: 'kya'
			});
		});
	}

	showWink() {
		var that = this;
		var canvas = that.canvas;
		this.resetEye(() => {
			canvas.attr('opacity', 1);
			that.showEyeBase();

			// black
			canvas.append('circle')
					.attr({
						r: 160,
						cx: 0,
						cy: 0,
						class: 'black'
					});

			// lid
			var theta1 = Math.PI / 8;
			var theta2 = -theta1;
			var r = that.r;
			var x1, y1, x2, y2;
			x1 = r * Math.sin(theta1);
			y1 = r * Math.cos(theta1);
			x2 = r * Math.sin(theta2);
			y2 = r * Math.cos(theta2);

			var d1 = 'M'+x2+','+y2+' A'+r+','+r+' 0 0,0 '+x1+','+y1;

			theta1 = Math.PI / 8 * 7;
			theta2 = -theta1;
			x1 = r * Math.sin(theta1);
			y1 = r * Math.cos(theta1);
			x2 = r * Math.sin(theta2);
			y2 = r * Math.cos(theta2);
			var d2 = 'M'+x2+','+y2+' A'+r+','+r+' 0 0,1 '+x1+','+y1;

			canvas.append('path')
				.attr('d', d1)
				.attr('class', 'wink1')
				.attr('fill', '#dddddd');

			canvas.append('path')
				.attr('d', d2)
				.attr('class', 'wink2')
				.attr('fill', '#dddddd');
			// wink
			close1();
			function close1() {
				var x1_close, y1_close, x2_close, y2_close, x12_close, y12_close, x22_close, y22_close;
				var theta1_close =  Math.PI / 8 * 3;
				var theta2_close = -theta1_close;
				x1_close = r * Math.sin(theta1_close);
				y1_close = r * Math.cos(theta1_close);
				x2_close = r * Math.sin(theta2_close);
				y2_close = r * Math.cos(theta2_close);
				var d1_close = 'M'+x2_close+','+y2_close+' A'+r+','+r+' 0 0,0 '+x1_close+','+y1_close+'z';

				var theta12_close =  Math.PI / 8 * 3.8;
				var theta22_close = -theta12_close;
				x12_close = r * Math.sin(theta12_close);
				y12_close = r * Math.cos(theta12_close);
				x22_close = r * Math.sin(theta22_close);
				y22_close = r * Math.cos(theta22_close);
				var d12_close = 'M'+x22_close+','+y22_close+' A'+r+','+r+' 0 0,0 '+x12_close+','+y12_close+'z';

				d3.select('.wink1')
						.transition()
						.delay(500)
						.duration(400)
						.ease('linear')
						.attr('d', d1_close)
						.each('end', () => {
							d3.select('.wink1')
							.transition()
							.duration(200)
							.ease('linear')
							.attr('d', d12_close);
						})
			}

			close2();
			function close2() {
				var x1_close, y1_close, x2_close, y2_close, x12_close, y12_close, x22_close, y22_close;
				var theta1_close =  Math.PI / 8 * 5;
				var theta2_close = -theta1_close;
				x1_close = r * Math.sin(theta1_close);
				y1_close = r * Math.cos(theta1_close);
				x2_close = r * Math.sin(theta2_close);
				y2_close = r * Math.cos(theta2_close);
				var d1_close = 'M'+x2_close+','+y2_close+' A'+r+','+r+' 0 0,1 '+x1_close+','+y1_close+'z';

				var theta12_close =  Math.PI / 8 * 4.2;
				var theta22_close = -theta12_close;
				x12_close = r * Math.sin(theta12_close);
				y12_close = r * Math.cos(theta12_close);
				x22_close = r * Math.sin(theta22_close);
				y22_close = r * Math.cos(theta22_close);
				var d12_close = 'M'+x22_close+','+y22_close+' A'+r+','+r+' 0 0,1 '+x12_close+','+y12_close+'z';

				d3.select('.wink2')
						.transition()
						.delay(500)
						.duration(400)
						.ease('linear')
						.attr('d', d1_close)
						.each('end', () => {
							d3.select('.wink2')
							.transition()
							.duration(200)
							.ease('linear')
							.attr('d', d12_close);
						})
			}

		});

	}

	showNomalEye() {
		var that = this;
		var canvas = that.canvas;
		this.resetEye(() => {
			canvas.attr('opacity', 1);
			that.showEyeBase();

			// black
			canvas.append('circle')
					.attr({
						r: 150,
						cx: 0,
						cy: 0,
						class: 'black'
					});
			that.showBrow();
		});

	}

	showBrow() {
		var that = this;
		var canvas = that.canvas;
		// brow
		var brow_width = 10,
				brow_theta1 = Math.PI * 2 / 3,
				brow_theta2 = -brow_theta1,
				brow_r = that.r - brow_width / 2
			;
		var x1 = brow_r * Math.sin(brow_theta1);
		var y1 = brow_r * Math.cos(brow_theta1);
		var x2 = brow_r * Math.sin(brow_theta2);
		var y2 = brow_r * Math.cos(brow_theta2);
		var brow_d = 'M'+x1+','+y1+' A'+brow_r+','+brow_r+' 0 0,0 '+x2+','+y2;
		console.log(brow_d);
		canvas.append('path')
			.attr('d', brow_d)
			.attr('class', 'brow');

	}

	showEyeLight() {
		var canvas = this.canvas;
		var cx_right = 92;
		var cx_left = 100;
		canvas
			.append('circle')
				.attr({
					r: 33,
					cx: 100,
					cy: 20,
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
		var d1t = 'M'+x11+','+y11+' A'+r+','+r+' 0 '+pattern+' '+x12+','+y12
					+ 'L'+x22+','+y22+' A'+r+','+r+' 0 '+pattern+' '+x21+','+y21
					+'z';

		//(x21, y21) -> (x11, y11)
		var d2t = 'M'+x21+','+y21+' A'+r+','+r+' 0 '+pattern+' '+x11+','+y11+'z';

		var delta1 = (Math.PI + t1 - t2)/2 + g;

		var rest = Math.PI / 4; // >= g
		var delta2 = (-rest + t2 - t1)/2 + g;

		return [d1t, d2t, delta1, delta2];
	}
	showLidTired() {
		var that = this;
		var canvas = that.canvas;
		this.resetEye(() => {
			canvas.attr('opacity', 1);
			that.showEyeBase();

			// black
			canvas.append('circle')
					.attr({
						r: 135,
						cx: 0,
						cy: 10,
						class: 'black'
					});
			that.showEyeLight();

			var t1 = -Math.PI*1.3, t2 = -Math.PI/2;
			var ds = that._getDstrings(t1, t2);
			var d1 = ds[0], d2 = ds[1], delta1 = ds[2], delta2 = ds[3];
			var ds2 = that._getDstrings(t1-delta1, t2+delta1);
			var d12 = ds2[0], d22 = ds2[1];
			canvas.append('path')
				.attr('d', d1)
				.attr('class', 'lidline')
				;

				canvas.append('path')
					.attr('d', d2)
					.attr('class', 'lidbody');

			looplidflash();
			function looplidflash() {
				d3.select('.lidline')
					.transition()
					.delay(500)
					.duration(500)
					.ease('cubic')
					.attr('d', d12)
					.each("end", function(){
						d3.select('.lidline')
							.transition()
							.delay(500)
							.duration(500)
							.attr('d', d1)
							.each("end", looplidflash)
					});

				d3.select('.lidbody')
					.transition()
					.delay(500)
					.duration(500)
					.ease('cubic')
					.attr('d', d22)
					.each("end", function(){
						d3.select('.lidbody')
							.transition()
							.delay(500)
							.duration(500)
							.attr('d', d => d2)
							.each("end", looplidflash)
					});

			;
			}
		});
	}
	detectDeviceMotion() {
		window.addEventListener('devicemotion', function(e) {
			if(!e || !e.accelerationIncludingGravity || !e.accelerationIncludingGravity.x || !e.accelerationIncludingGravity.y || !e.accelerationIncludingGravity.z){
				return;
			}
			var ax = e.accelerationIncludingGravity.x;
			var ay = e.accelerationIncludingGravity.y;
			var az = e.accelerationIncludingGravity.z;
			if (ax > 50 || ay > 50 || az > 50){
				console.log("ax: " + ax);
				console.log("ay: " + ay);
				console.log("az: " + az);
			}
		});
	}

}

var c = new Eyes();
c.init();

var Child = function () { };
Child.prototype = new Eyes();

Child.prototype.init = function(){
    this.width = 360;
    this.height = 360;
    this.r = this.width / 2;
    this.canvas = d3.select('#canvas2')
    .append('svg')
    .attr('width', this.width)
    .attr('height', this.height)
    .append('g')
    .attr('transform', 'translate('+this.width/2+', '+this.height/2+')');

    this.showEyeBase();
    this.showLidTired();
    var that = this;
	this.index = 0;
	this.face_status = 'showLidTired';

	d3.select('#canvas2').on('click', () => {
		that.showNomalEye();
		var arr = ['kya', 'showNomalEye', 'curious', 'showWink', 'showLidTired'];
		var face_status = arr[that.index%5];
		that[face_status]();
		that.index++;
		that.face_status = face_status;
	});

	document.getElementById('btn').addEventListener("click", function(e){
		e.preventDefault();
		console.log(e);
		startRecording (function(data){
			that.curious();
		});
	});


    this.detectDeviceMotion();
}

Child.prototype.showEyeLight = function() {
    var canvas = this.canvas;
    var cx_right = -92;
    var cx_left = -100;
    canvas
    .append('circle')
    .attr({
        r: 33,
        cx: -100,
        cy: 20,
        class: 'eyelight2'
    });
    repeat();
    function repeat(){
        d3.select('.eyelight2')
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
};

Child.prototype.showLidTired = function() {
    var that = this;
    var canvas = this.canvas;

    // black
    canvas.append('circle')
    .attr({
        r: 135,
        cx: 0,
        cy: 10,
        class: 'black'
    });
    this.showEyeLight();

    var t1 = Math.PI/2, t2 = Math.PI*1.3;
    var ds = this._getDstrings(t1, t2);
    var d1 = ds[0], d2 = ds[1], delta1 = ds[2], delta2 = ds[3];
    var ds2 = this._getDstrings(t1-delta1, t2+delta1);

    var d12 = ds2[0], d22 = ds2[1];
    canvas.append('path')
    .attr('d', d1)
    .attr('class', 'lidline2');

    canvas.append('path')
    .attr('d', d2)
    .attr('class', 'lidbody2');

    looplidflash();
    function looplidflash() {
        d3.select('.lidline2')
        .transition()
        .delay(500)
        .duration(500)
        .ease('cubic')
        .attr('d', d12)
        .each("end", function(){
            d3.select('.lidline2')
            .transition()
            .delay(500)
            .duration(500)
            .attr('d', d1)
            .each("end", looplidflash)
        });

        d3.select('.lidbody2')
        .transition()
        .delay(500)
        .duration(500)
        .ease('cubic')
        .attr('d', d22)
        .each("end", function(){
            d3.select('.lidbody2')
            .transition()
            .delay(500)
            .duration(500)
            .attr('d', d => d2)
            .each("end", looplidflash)
        });
    }
};

Child.prototype.kya = function() {
	var that = this;
	var canvas = that.canvas;
	this.resetEye(() => {
		canvas.attr('opacity', 1);
		that.showEyeBase();

		// kya
		canvas.append('line')
			.attr({
				x1: 50,
				y1: -170,
				x2: -170,
				y2: 10,
				class: 'kya2'
			});
		canvas.append('line')
			.attr({
				x1: 170,
				y1: -30,
				x2: -170,
				y2: 10,
				class: 'kya2'
			});
		canvas.append('line')
			.attr({
				x1: 60,
				y1: 150,
				x2: -170,
				y2: 10,
				class: 'kya2'
			});
	});	
};


var child = new Child();
child.init();
