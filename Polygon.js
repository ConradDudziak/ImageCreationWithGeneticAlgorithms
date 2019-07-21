class Polygon {
	// Constructor a random Polygon
	constructor(numVertices) {
		// Vertices
		this.npoints = numVertices  //floor(random(3, 9));
		// Colors
		this.red = Math.random();
		this.green = Math.random();
		this.blue = Math.random();
		this.alpha = Math.random();

		// Calculate Vertices
		this.vertices = [];
		for (let i = 0; i < this.npoints; i++) {
			this.vertices[i] = new Vertex();
		}
	}

	getVertices() {
		return this.vertices;
	}

	getRed() {
		return this.red;
	}
	
	setRed(red) {
		this.red = red;
	}

	getGreen() {
		return this.green;
	}
	
	setGreen(green) {
		this.green = green;
	}
	
	getBlue() {
		return this.blue;
	}
	
	setBlue(blue) {
		this.blue = blue;
	}

	getAlpha() {
		return this.alpha;
	}
	
 	setAlpha(alpha) {
		this.alpha = alpha;
	}
}