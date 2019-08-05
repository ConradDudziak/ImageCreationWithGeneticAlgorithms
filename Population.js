class Population {
	// Constructs a Population of Individuals.
	// polygonCount and vertexCount are integer values used to create the polygon
	// sets held within each Individual.
	// targetData is an array of image data that represents the input target image.
	// DataContext is a canvas context used in the drawing of an individuals polygon
	// set for comparisons to the targetData.
	// Width and height are integer values used to map Individual polygon sets to the
	// dataContext.
	// The mutation rate is a decimal value that determines how frequently an 
	// Individuals data can mutate.
	// populationSize is an integer value that determines how many Individuals exist
	// within the populatoin.
	constructor(width, height, 
				polygonCount, vertexCount, 
				targetData, dataContext, 
				mutationRate, populationSize) {
		this.width = width;
		this.height = height;
		this.population = [];
		this.matingPool = [];
		this.generations = 0;
		this.finished = false;
		this.dataContext = dataContext;
		this.mutationRate = mutationRate;
		this.perfectScore = 1;
		this.targetData = targetData;
		
		this.best = null;
		
		// Populate the population with random Individuals.
		for (let i = 0; i < populationSize; i++) {
			this.population[i] = new Individual(polygonCount, vertexCount);
		}

		this.calcFitness();
	}

	// Calculate the fitness of each individual in the population array.
	calcFitness() {
		for (let i = 0; i < this.population.length; i++) {
			this.population[i].calcFitness(this.targetData, this.dataContext, this.width, this.height);
		}
	}

	// Populate the mating pool with individuals for breeding selection.
	naturalSelection() {
		this.matingPool = [];

		let bestFitness = 0;
		let worstFitness = 1;
		for (let i = 0; i < this.population.length; i++) {
			if (this.population[i].fitness > bestFitness) {
				bestFitness = this.population[i].fitness;
			}
			
			if (this.population[i].fitness < worstFitness) {
				worstFitness = this.population[i].fitness;
			}
		}

		// Based on fitness, each member will get added to the mating pool 
		// a certain number of times proportional to the largest fitness.
		for (let i = 0; i < this.population.length; i++) {
			let fitness = this.rescale(this.population[i].fitness, worstFitness, bestFitness, 0, 1);
			//console.log("--My rescaled fitness: " + fitness);
			let n = Math.floor(fitness * fitness * 100);
			//console.log("--Add me " + n + " times");
			for (let j = 0; j < n; j++) { 
				this.matingPool.push(this.population[i]);
			}
		}
	}
	
	// Receives a numeric value between the ranges of minA and minB, and returns a 
	// rescaled value between minB and maxB.
	rescale(value, minA, maxA, minB, maxB) {
		return ((value - minA) / (maxA - minA)) * (maxB - minB) + minB;
	}

	// Breed individuals within the mating pool to create a new generation.
	// The population is then replaced with the new individuals.
	breed() {
		// Loop through the populaton.
		for (let i = 0; i < this.population.length; i++) {
			// Choose two random parents from the mating pool.
			let a = Math.floor(Math.random() * this.matingPool.length);
			let b = Math.floor(Math.random() * this.matingPool.length);
			let partnerA = this.matingPool[a];
			let partnerB = this.matingPool[b];
			// Create a child by breeding the parents and mutating the result.
			let child = partnerA.crossover(partnerB, this.mutationRate);
			// Replace an old population member with the child.
			this.population[i] = child;
		}
		this.generations++;
	}
	
	// Returns the Individual with the largest fitness score.
	getBest() {
		return this.best;
	}

	// Determine the best fit Individual in the population.
	evaluate() {
		let bestFitness = 0.0;
		let index = 0;
		for (let i = 0; i < this.population.length; i++) {
			if (this.population[i].fitness > bestFitness) {
				index = i;
				bestFitness = this.population[i].fitness;
			}
		}

		this.best = this.population[index];
		
		// Check if the population has produced a individual 
		// with a perfect fitness score.
		if (bestFitness === this.perfectScore) {
			this.finished = true;
		}
	}
	
	// Returns true if the populatoin has produced a individual
	// with a perfect fitness score.
	isFinished() {
		return this.finished;
	}
	
	// Returns the numbers of generations that the population has
	// experienced.
	getGenerations() {
		return this.generations;
	}

	// Returns the average fitness of the population.
	getAverageFitness() {
		let total = 0;
		for (let i = 0; i < this.population.length; i++) {
			total += this.population[i].fitness;
		}
		return total / (this.population.length);
	}
	
	// Applies all the steps necessary to produce a single generation
	// in the population.
	generate(outputContext, width, height) {
		this.naturalSelection();
		this.breed();
		this.calcFitness();
		this.evaluate();
		this.displayData(outputContext, width, height);
	}
	
	betterGenerate(outputContext, width, height) {
		var tempPopulation = this.clonePopulation();
		this.mutatePopulation();
		if (this.checkDirty()) {
			this.generations++;
			this.calcFitness();
			var currentBest = this.best;
			this.evaluate();
			// If bad progress, reset
			console.log("current " + currentBest);
			console.log("new " + this.getBest());
			if (currentBest > this.getBest()) {
				this.population = tempPopulation;
			}
		}
		this.displayData(outputContext, width, height);
	}
	
	checkDirty() {
		for (var i = 0; i < this.population.length; i++) {
			if (this.population[i].dirty) {
				return true;
			}
		}
		return false;
	}
	
	mutatePopulation() {
		for (var i = 0; i < this.population.length; i++) {
			this.population[i].betterMutate(this.mutationRate);
		}
	}
	
	clonePopulation() {
		var result = [];
		for (var i = 0; i < this.populationSize; i++) {
			result[i] = this.population[i].clone();
		}
		return result;
	}
	
	// Outputs the current best individual of the population to the outputCanvas.
	displayData(outputContext, width, height) {
		var best = this.getBest();
		if (best == null) {
			console.log("Best was not set. Cannot evolve.")
		} else {
			this.getBest().draw(outputContext, width, height);
		}
	}
}