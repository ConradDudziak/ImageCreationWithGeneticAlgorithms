// Constructor (makes a random individual)
class Individual {
	constructor(polygonCount, vertexCount) {
		// The genetic sequence
		this.polygonCount = polygonCount;
		this.vertexCount = vertexCount;
		this.genes = new Illustration(polygonCount, vertexCount);
		this.fitness = 0;
	}

	// Returns the Image representation of the individual
	getGenes() {
		return this.genes;
	}

	// Fitness function
	// Larger fitness is more fit
	calcFitness(workingContext, width, height) {
		this.draw(workingContext, width, height);
		
		var imageData = workingContext.getImageData(0, 0, width, height).data;
		
		var diff = 0;
		
		for (var i = 0; i < width * height * 4; i++) {
			var delta = imageData[i] - workingData[i];
			diff += delta * delta;
		}
		
		this.fitness = 1 - diff / (width * height * 4 * 256 * 256);
	}

	// Crossover
	crossover(partner, mutationRate) {
		var child = new Individual(this.polygonCount, this.vertexCount);
		
		for (var i = 0; i < polygonCount; i++) {
			var currentParent = (Math.random() < 0.5) ? this : partner;
			var currentParentPolygon = currentParent.genes.getPolygons()[i];
			var currentChildPolygon = child.genes.getPolygons()[i];
			var parentVertices = currentParentPolygon.getVertices();
			var childVertices = currentChildPolygon.getVertices();
			
			currentChildPolygon.setRed(mutate(currentParentPolygon.getRed()));
			currentChildPolygon.setGreen(mutate(currentParentPolygon.getGreen()));
			currentChildPolygon.setBlue(mutate(currentParentPolygon.getBlue()));
			currentChildPolygon.setAlpha(mutate(currentParentPolygon.getAlpha()));
			
			for (var j = 0; j < parentVertices.length; j++) {
				childVertices[j].setX(mutate(parentVertices[j].getX()));
				childVertices[j].setY(mutate(parentVertices[j].getY()));
			}
		}
		return child;
	}
	
	mutate(value, mutationRate) {
		var result = value;
		if (Math.random() < mutationRate) {
			result = value + Math.random() * 0.1 * 2 - 0.1;
		
			if (result < 0) {
				result = 0;
			}
			if (result > 1) {
				result = 1;
			}
		}
		return result;
	}
	
	draw(canvasContext, width, height) {
		this.genes.draw(canvasContext, width, height);
	}
}