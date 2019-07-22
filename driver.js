var outputCanvas;
var outputContext;

var inputImage;
var inputCanvas;
var inputContext;
var inputImageRes;

var dataCanvas;
var dataContext;

var targetSize;
var targetData;

var mutationRate;
var populationSize;
var polygons;
var vertices;

function startGeneticAlgorithm() {
	population = new Population(targetSize, targetSize,
								polygons, vertices,
								targetData, dataContext, 
								mutationRate, populationSize);
	//function iterate() {
		population.generate(outputContext, inputImageRes, inputImageRes);
	//}
	//setInterval(iterate, 0);
}

function setupdataCanvas() {
	inputCanvas.width = targetSize;
	inputCanvas.height = targetSize;
	inputContext.drawImage(inputImage, 0, 0, inputImageRes, inputImageRes, 0, 0, targetSize, targetSize);
	
	var rescaledImageData = inputContext.getImageData(0, 0, targetSize, targetSize).data;
	
	targetData = [];
	for (var i = 0; i < targetSize * targetSize * 4; i++) {
		targetData[i] = rescaledImageData[i];
	}
	
	inputCanvas.width = inputImageRes;
	inputCanvas.height = inputImageRes;
	inputContext.drawImage(inputImage, 0, 0);	
}

function configuration() {
	inputImageRes = 350;
	targetSize = 75; // Cannot be greater than inputImageRes
	
	populationSize = 50;
	polygons = 125;
	vertices = 3;
	mutationRate = 0.01;
	
	dataCanvas.width = targetSize;
	dataCanvas.height = targetSize;
    dataCanvas.style.width = targetSize;
    dataCanvas.style.height = targetSize;
}

function boot() {
	outputCanvas = document.getElementById("outputCanvas");
	outputContext = outputCanvas.getContext('2d');
	
	inputImage = document.getElementById("inputImage");
	inputCanvas = document.getElementById("inputCanvas");
	inputContext = inputCanvas.getContext('2d');
	
	dataCanvas = document.getElementById("dataCanvas");
	dataContext = dataCanvas.getContext('2d');
	
	configuration();
	
	setupdataCanvas();
	
	startGeneticAlgorithm();
}

window.onload = this.boot;