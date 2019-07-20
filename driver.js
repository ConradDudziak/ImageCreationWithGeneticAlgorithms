var outputCanvas;
var outputContext;

var referenceImage;
var referenceCanvas;
var referenceContext;

var workingCanvas;
var workingContext;
var workingSize;
var workingData;

var mutationRate;
var populationSize;
var polygons;
var vertices;
var geneSize;
var dnaLength;

function setImage(src) {
	referenceImage.onload = prepareImage();
	referenceImage.src = src;
}

function prepareImage() {
	referenceCanvas.width = workingSize;
	referenceCanvas.height = workingSize;
	
	referenceContext.drawImage(referenceImage, 0, 0, 350, 350, 0, 0, workingSize, workingSize);
	
	var imageData = referenceContext.getImageData(0, 0, workingSize, workingSize).data;
	
	
	workingData = [];
	var p = workingSize * workingSize * 4;
	
	for (var i = 0; i < p; i++) {
		workingData[i] = imageData[i];
	}
	
	referenceCanvas.width = 350;
	referenceCanvas.height = 350;
	referenceContext.drawImage(referenceImage, 0, 0);
	//highestFitness = 0;
	//lowestFitness = 100;
	
}

function configuration() {
	workingSize = 75;
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
}

window.onload = this.boot();