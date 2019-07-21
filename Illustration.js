class Illustration {
	// Construct a random Image
	constructor(polygonCount, vertexCount) {
		this.polygons = [];
		
		for (var i = 0; i < polygonCount; i++) {
			this.polygons[i] = new Polygon(vertexCount);
		}
	}

	getPolygons() {
		return this.polygons;
	}

	draw(canvasContext, width, height) {
		canvasContext.fillStyle = '#000';
		canvasContext.fillRect(0, 0, width, height);
		
		for (var i = 0; i < this.polygons.length; i++) {
			var vertices = this.polygons[i].getVertices();
			canvasContext.beginPath();
			
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
			
			var styleString = 'rgba(' +
			((this.polygons[i].getRed() * 255) >> 0) + ',' +    // R - int [0,255]
			((this.polygons[i].getGreen() * 255) >> 0) + ',' +  // G - int [0,255]
			((this.polygons[i].getBlue() * 255) >> 0) + ',' +   // B - int [0,255]
			this.polygons[i].getAlpha() + ')'; 					// A - float [0,1]
			
			canvasContext.fillStyle = styleString;
			canvasContext.fill();
		}
	}
}