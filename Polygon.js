class Polygon {
	// Construct a random Polygon with numVertices total vertices.
	constructor(numVertices) {
		// Vertices
		this.npoints = numVertices
		// Colors
		this.red = Math.random();
		this.green = Math.random();
		this.blue = Math.random();
		this.alpha = Math.random();

		// Popoulate the vertices list with random Vertexs
		this.vertices = [];
		for (let i = 0; i < this.npoints; i++) {
			this.vertices[i] = new Vertex();
		}
	}
	
	// Return the vertex list of this Polygon.
	getVertices() {
		return this.vertices;
	}
	
	// Return the red value of this Polygon.
	getRed() {
		return this.red;
	}
	
	// Set the red value of this Polygon.
	setRed(red) {
		this.red = red;
	}
	
	// Return the green value of this Polygon.
	getGreen() {
		return this.green;
	}
	
	// Set the green value of this Polygon.
	setGreen(green) {
		this.green = green;
	}
	
	// Return the blue value of this Polygon.
	getBlue() {
		return this.blue;
	}
	
	// Set the blue value of this Polygon.
	setBlue(blue) {
		this.blue = blue;
	}
	
	// Return the alpha value of this Polygon.
	getAlpha() {
		return this.alpha;
	}
	
	// Set the alpha value of this Polygon.
 	setAlpha(alpha) {
		this.alpha = alpha;
	}
}