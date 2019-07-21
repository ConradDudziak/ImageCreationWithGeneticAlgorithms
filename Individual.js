// Constructor (makes a random individual)
class Individual {
	constructor(polygonCount, vertexCount) {
		// The genetic sequence
		this.genes = new Illustration(polygonCount, vertexCount);
		this.fitness = 0;
	}

	// Returns the Image representation of the individual
	getImage() {
		return this.genes;
	}

	// Fitness function
	calcFitness(target) {

	}

	distance(firstVertex, secondVertex) {

	}

	// Crossover
	crossover() {

	}

	mutate(mutationRate) {

	}
	
	draw(canvasContext, width, height) {
		this.genes.draw(canvasContext, width, height);
	}
}