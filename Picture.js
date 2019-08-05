class Picture {
	// Construct a random Picture
	constructor(polygonCount, vertexCount) {
		this.polygons = [];
		this.vertexCount = vertexCount;
	
		for (var i = 0; i < polygonCount; i++) {
			this.polygons[i] = new Polygon(vertexCount);
		}
	}

	// Returns the polygon array of this Picture
	getPolygons() {
		return this.polygons;
	}
	
	clone() {
		var result = new Picture(this.polygons.length, this.vertexCount);
		for (var i = 0; i < this.polygons.length; i++) {
			result.polygons[i] = this.polygons[i].clone();
		}
		return result;
	}

	// Draws the array of polygons to the given canvasContext with width and height.
	draw(canvasContext, width, height) {
		// Set the background color.
		canvasContext.fillStyle = '#000';
		canvasContext.fillRect(0, 0, width, height);
		
		// Draw each polygon to the canvas.
		for (var i = 0; i < this.polygons.length; i++) {
			var vertices = this.polygons[i].getVertices();
			canvasContext.beginPath();
			
			// Loop through the list of vertices of the polygon.
			for (var j = 0; j < vertices.length; j++) {
				if (j == 0) {
					canvasContext.moveTo(vertices[j].getX() * width,
										 vertices[j].getY() * height);
				} else {
					canvasContext.lineTo(vertices[j].getX() * width,
										 vertices[j].getY() * height);
				}
			}
			canvasContext.closePath();
			
			// Fill the color of each polygon.
			var rgbaString = 'rgba(' +
			Math.floor(this.polygons[i].getRed() * 255) + ',' + 
			Math.floor(this.polygons[i].getGreen() * 255) + ',' +
			Math.floor(this.polygons[i].getBlue() * 255) + ',' + 
			this.polygons[i].getAlpha() + ')';
			
			canvasContext.fillStyle = rgbaString;
			canvasContext.fill();
		}
	}
}