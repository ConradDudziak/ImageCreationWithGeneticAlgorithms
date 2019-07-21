var outputCanvas;
var outputContext;

var referenceImage;
var referenceCanvas;
var referenceContext;

var workingCanvas;
var workingContext;
var workingSize;
var workingData;

var imageRes;

var mutationRate;
var populationSize;
var polygons;
var vertices;
var geneSize;
var dnaLength;

// dnaLength = polygons * (4 + vertices * 2);

function runSimulation() {
	population = new Population(polygons, vertices, 
								referenceContext, mutationRate, populationSize);
	population.evolve(workingSize, imageRes);
}

function startSimulation() {
	runSimulation();
}

function setImage(src) {
	referenceImage.onload = prepareImage;
	referenceImage.src = src;
}

function prepareImage() {
	referenceCanvas.width = workingSize;
	referenceCanvas.height = workingSize;
	referenceContext.drawImage(referenceImage, 0, 0, imageRes, imageRes, 0, 0, workingSize, workingSize);
	
	var imageData = referenceContext.getImageData(0, 0, workingSize, workingSize).data;
	
	
	workingData = [];
	var p = workingSize * workingSize * 4;
	
	for (var i = 0; i < p; i++) {
		workingData[i] = imageData[i];
	}
	
	referenceCanvas.width = imageRes;
	referenceCanvas.height = imageRes;
	referenceContext.drawImage(referenceImage, 0, 0);
	//highestFitness = 0;
	//lowestFitness = 100;
	
}

function configuration() {
	imageRes = 350;
	workingSize = 75; // Cannot be greater than imageRes
	
	populationSize = 50;
	polygons = 125;
	vertices = 3;
	mutationRate = 0.01;
	geneSize = 1;
	dnaLength = polygons * geneSize;
	
	workingCanvas.width = workingSize;
	workingCanvas.height = workingSize;
    workingCanvas.style.width = workingSize;
    workingCanvas.style.height = workingSize;
}

function boot() {
	outputCanvas = document.getElementById("outputCanvas");
	outputContext = outputCanvas.getContext('2d');
	
	referenceImage = document.getElementById("referenceImage");
	referenceCanvas = document.getElementById("referenceCanvas");
	referenceContext = referenceCanvas.getContext('2d');
	
	workingCanvas = document.getElementById("workingCanvas");
	workingContext = workingCanvas.getContext('2d');
	
	configuration();
	
	prepareImage();
	
	startSimulation();
}

window.onload = this.boot;