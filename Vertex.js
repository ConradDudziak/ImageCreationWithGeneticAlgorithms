class Vertex {
	// Construct a random vertex, or a specific vertex if provided (x, y).
	constructor(x, y) {
		if(arguments.length > 0) {
			this.x = x;
			this.y = y;  
		} else {
			this.x = Math.random();
			this.y = Math.random();
		}
	}
	
	clone() {
		var result = new Vertex();
		result.x = this.x;
		result.y = this.y;
		return result;
	}
	
	// Return this vertex's x value.
	getX() {
		return this.x;
	}
	
	// Set this vertex's x value.
	setX(x) {
		this.x = x;
	}
	
	// Get this vertex's y value.
	getY() {
		return this.y;
	}
	
	// Set this vertex's y value.
	setY(y) {
		this.y = y;
	}
}