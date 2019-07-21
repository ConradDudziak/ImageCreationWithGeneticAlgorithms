class Population {
	constructor(polygonCount, vertexCount, target, mutationRate, populationSize) {
		this.population; // Array to hold the current population
		this.matingPool = []; // ArrayList which we will use for our "mating pool"
		this.generations = 0; // Number of generations
		this.finished = false; // Are we finished evolving?
		this.target = target; // Target polygon
		this.mutationRate = mutationRate; // Mutation rate
		this.perfectScore = 1;

		this.best = null;

		this.population = [];
		for (let i = 0; i < populationSize; i++) {
			this.population[i] = new Individual(polygonCount, vertexCount);
		}

		//this.calcFitness();
	}
	
	/*
	drawAnIndividual(canvasContext) {
		this.population[0].draw(canvasContext);
	}
	*/
	
	evolve(workingContext, workingSize, outputContext, outputSize) {
		var best = getBest();
		if (best == null) {
			console.log("Best was not set. Cannot evolve.")
		} else {
			getBest().draw(outputContext, outputSize, outputSize);
		}
	}

	// Fill our fitness array with a value for every member of the population
	calcFitness() {
		for (let i = 0; i < this.population.length; i++) {
			this.population[i].calcFitness(target);
		}
	}

	// Generate a mating pool
	naturalSelection() {
		// Clear the ArrayList
		this.matingPool = [];

		let maxFitness = 0;
		for (let i = 0; i < this.population.length; i++) {
			if (this.population[i].fitness > maxFitness) {
				maxFitness = this.population[i].fitness;
			}
		}

		// Based on fitness, each member will get added to the mating pool a certain number of times
		for (let i = 0; i < this.population.length; i++) {
			let fitness = map(this.population[i].fitness, 0, maxFitness, 0, 1);
			let n = floor(fitness * 100);
			for (let j = 0; j < n; j++) { 
				this.matingPool.push(this.population[i]);
			}
		}
	}

	// Create a new generation
	generate() {
		// Refill the population with children from the mating pool
		print(this.matingPool);
		for (let i = 0; i < this.population.length; i++) {
			let a = floor(random(this.matingPool.length));
			let partnerA = this.matingPool[a];
			let child = partnerA.crossover();
			child.mutate(this.mutationRate);
			this.population[i] = child;
		}
		this.generations++;
	}


	getBest() {
		return this.best;
	}

	// Compute the current "most fit" member of the population
	evaluate() {
		let worldrecord = 0.0;
		let index = 0;
		for (let i = 0; i < this.population.length; i++) {
			if (this.population[i].fitness > worldrecord) {
				index = i;
				worldrecord = this.population[i].fitness;
			}
		}

		this.best = this.population[index].getPolygon();
		if (worldrecord === this.perfectScore) {
			this.finished = true;
		}
	}

	isFinished() {
		return this.finished;
	}

	getGenerations() {
		return this.generations;
	}

	// Compute average fitness for the population
	getAverageFitness() {
		let total = 0;
		for (let i = 0; i < this.population.length; i++) {
			total += this.population[i].fitness;
		}
		return total / (this.population.length);
	}
}