var o;
var dr = 2;
var slider;
var button;

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	slider = createSlider(0.1, 2.5, 0.5, 0.1);
	slider.position(20, 20);
	slider.style("width", "200px");
	button = createButton('Clear');
	button.mousePressed(clearWaves);
	button.position(20, 60);
	o = new Circle(0, height/2, 1.15, 0);
	textSize(20);
	//o = new Wave(0, height/2);
}

function draw() {
	background(255);

	if(frameCount%40 == 0) {
		o.generateWave();
	}

	o.show();
	o.update();

	console.log(o.w.length);
	
	if(o.xs > 0) {
		o.xs = slider.value();
	} else {
		o.xs = -1*slider.value();
	}

	fill(0);
	strokeWeight(2);
	stroke(255);
	text(floor(slider.value()*100) + "% of sound speed", 230, 40);
}

function clearWaves() {
	o.w = [];
}

function Circle(x, y, xs, ys) {
	this.w =[];
	this.x = x;
	this.y = y;
	this.xs = xs;
	this.ys = ys;

	this.show = function() {
		for(var i=0; i<this.w.length; i++) {
			this.w[i].show();
		}
		fill(255, 0, 0);
		noStroke();
		ellipse(this.x, this.y, 16, 16);
	}

	this.update = function() {
		this.x += this.xs;
		this.y += this.ys;
		if(this.x <= 0 || this.x >= width) {
			this.xs *= -1;
		}
		if(this.y <= 0 || this.y >= height) {
			this.ys *= -1;
		}
		for(var i=0; i<this.w.length; i++) {
			this.w[i].update();
			if(this.w[i].r >= width*2) {
				this.w.splice(i, 1);
				i--;
			}
		}
	}

	this.generateWave = function() {
		var newWave = new Wave(this.x, this.y);
		this.w.push(newWave);
	}
}

function Wave(x, y) {
	this.r = 0;
	this.x = x;
	this.y = y;

	this.show = function() {
		push();
		translate(this.x, this.y);
		strokeWeight(2);
		stroke(128);
		noFill();
		ellipse(0, 0, this.r, this.r);
		/*var prevx = this.r;
		var prevy = 0;
		for(var t=0; t<TWO_PI; t+=0.2) {
			var x = this.r*cos(t);
			var y = this.r*sin(t);
			line(prevx, prevy, x, y);
			prevx = x;
			prevy = y;
		}*/
		pop();
	}

	this.update = function() {
		this.r += dr;
	}
}