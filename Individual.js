class Individual {
	// Constructor (makes a random individual)
	constructor(polygonCount, vertexCount) {
		this.polygonCount = polygonCount;
		this.vertexCount = vertexCount;
		this.genes = new Picture(polygonCount, vertexCount);
		this.fitness = 0;
	}

	// Returns the Picture representation of the individual
	getGenes() {
		return this.genes;
	}

	// Fitness function (Larger fitness is more fit).
	calcFitness(targetData, dataContext, width, height) {
		// Draw this individuals genes to the dataContext
		this.draw(dataContext, width, height);
		
		// Retrieve the image data of this individal from the dataContext
		var myImageData = dataContext.getImageData(0, 0, width, height).data;
		
		var sum = 0;
		
		// Summate the squared differences of this individuals pixels from the
		// targets pixels.
		for (var i = 0; i < width * height * 4; i++) {
			var delta = myImageData[i] - targetData[i];
			sum += delta * delta;
		}
		
		// Calculate the fitness of this individual by calculating the largest
		// possible difference and subtracting the ratio from 1.
		this.fitness = 1 - (sum / (width * height * 4 * 255 * 255));
	}

	// Breed this individual with the partner individual, and return a child individual.
	// The child individual's data will be randomly mutated based on the mutationRate.
	crossover(partner, mutationRate) {
		var child = new Individual(this.polygonCount, this.vertexCount);
		
		for (var i = 0; i < this.polygonCount; i++) {
			// Choose a random gene donor between the parents.
			var choosePartner = (Math.random() < 0.5);
			var currentParent = this;
			if (choosePartner) {
				currentParent = partner;
			}
			
			// Get the current gene sequence (polygon) of the parents.
			var currentParentPolygon = currentParent.genes.getPolygons()[i];
			var currentChildPolygon = child.genes.getPolygons()[i];
			// Get the vertex lists of each current gene sequence.
			var parentVertices = currentParentPolygon.getVertices();
			var childVertices = currentChildPolygon.getVertices();
			
			// Set the color values of the child polygon to be the mutated values of
			// the parents polygon.
			currentChildPolygon.setRed(this.mutate(currentParentPolygon.getRed(), mutationRate));
			currentChildPolygon.setGreen(this.mutate(currentParentPolygon.getGreen(), mutationRate));
			currentChildPolygon.setBlue(this.mutate(currentParentPolygon.getBlue(), mutationRate));
			currentChildPolygon.setAlpha(this.mutate(currentParentPolygon.getAlpha(), mutationRate));
			
			// Set the vertex values of the child polygon to be the mutated values of
			// the parents polygon.
			for (var j = 0; j < parentVertices.length; j++) {
				childVertices[j].setX(this.mutate(parentVertices[j].getX(), mutationRate));
				childVertices[j].setY(this.mutate(parentVertices[j].getY(), mutationRate));
			}
		}
		// Random Chance that a polygon will be moved in the polygon array.
		if (this.polygonCount > 0) {
			if (Math.random() < mutationRate) {
				console.log("Mutate polygon position");
				/*
				var randIndex = Math.floor(Math.random() * (this.polygonCount + 1));
				var childPolygons = child.genes.getPolygons();
				var removedPolygon = childPolygons.splice(randIndex, 1);
				
				var randInsertIndex = Math.floor(Math.random() * (this.polygonCount + 1));
				childPolygons.splice(randInsertIndex, 0, removedPolygon);
				*/
			}
		}
		return child;
	}
	
	/*
	function arraymove(arr, fromIndex, toIndex) {
		var element = arr[fromIndex];
		arr.splice(fromIndex, 1);
		arr.splice(toIndex, 0, element);
	}
	*/
	
	// Mutate a value with a chance of mutationRate.
	// If the value is not mutated, the value is returned unchanged.
	mutate(value, mutationRate) {
		var result = value;
		if (Math.random() < mutationRate) {
			result = value + Math.random() * 0.1 * 2 - 0.1;
			// Clamp result between 0 and 1.
			result = Math.min(Math.max(result, 0), 1);
		}
		return result;
	}
	
	// Draw this individual to the given canvasContext with width and height.
	draw(canvasContext, width, height) {
		this.genes.draw(canvasContext, width, height);
	}
}