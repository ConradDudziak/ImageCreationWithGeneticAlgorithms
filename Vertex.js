// Constructor a random vertex
class Vertex {
	constructor(x, y) {
		if(arguments.length > 0) {
			this.x = x;
			this.y = y;  
		} else {
			this.x = Math.random();
			this.y = Math.random();
		}
	}

	getX() {
		return this.x;
	}
	
	setX(x) {
		this.x = x;
	}

	getY() {
		return this.y;
	}
	
	setY(y) {
		this.y = y;
	}
}