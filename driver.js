var initilizationComplete;
var stopClicked;
var currentInterval;

var outputCanvas;
var outputContext;

var fileInput;
var inputImage;
var inputCanvas;
var inputContext;
var inputImageRes;

var dataCanvas;
var dataContext;
var dataSize;

var targetData;

var mutationRate;
var populationSize;
var polygons;
var vertices;

// Create an instance of the population and iterate
// over its generations.
function startGeneticAlgorithm() {
	population = new Population(dataSize, dataSize,
								polygons, vertices,
								targetData, dataContext, 
								mutationRate, populationSize);
	function iterate() {
		population.generate(outputContext, inputImageRes, inputImageRes);
	}
	
	currentInterval = setInterval(iterate, 0);
}

// Sets the targetData by scaling the inputImage to the dataCanvas.
function setupDataCanvas() {
	inputCanvas.width = dataSize;
	inputCanvas.height = dataSize;
	inputContext.drawImage(inputImage, 0, 0, inputImageRes, inputImageRes, 0, 0, dataSize, dataSize);
	
	var rescaledImageData = inputContext.getImageData(0, 0, dataSize, dataSize).data;
	
	targetData = [];
	for (var i = 0; i < dataSize * dataSize * 4; i++) {
		targetData[i] = rescaledImageData[i];
	}
	
	inputCanvas.width = inputImageRes;
	inputCanvas.height = inputImageRes;
	inputContext.drawImage(inputImage, 0, 0);	
}

function startClick() {
	startGeneticAlgorithm();
}

function stopClick() {
	clearInterval(currentInterval);
	stopClicked = true;
}

function inputFile(){
	var preview = document.querySelector('img'); //selects the query named img
	var file = document.querySelector('input[type=file]').files[0]; //sames as here
	var reader = new FileReader();
	
	reader.onloadend = function () {
		preview.src = reader.result;
	}

	if (file) {
		reader.readAsDataURL(file); //reads the data as a URL
	} else {
		preview.src = "";
	}
}

// Initializes all GA parameters.
function configuration() {
	inputImageRes = 350;
	dataSize = 75; // Cannot be greater than inputImageRes
	
	populationSize = 50;
	polygons = 125;
	vertices = 3;
	mutationRate = 0.01;
	
	dataCanvas.width = dataSize;
	dataCanvas.height = dataSize;
    dataCanvas.style.width = dataSize;
    dataCanvas.style.height = dataSize;
	
	stopClicked = false;
}

// Initilizes all html canvas elements, configures data parameters,
// and then starts the genetic algorithm.
function boot() {
	fileInput = document.getElementById("fileInput");
	
	outputCanvas = document.getElementById("outputCanvas");
	outputContext = outputCanvas.getContext('2d');
	
	inputImage = document.getElementById("inputImage");
	inputCanvas = document.getElementById("inputCanvas");
	inputContext = inputCanvas.getContext('2d');
	
	dataCanvas = document.getElementById("dataCanvas");
	dataContext = dataCanvas.getContext('2d');
	
	configuration();
	
	setupDataCanvas();
	
	//initilizationComplete = true;
	
	//startGeneticAlgorithm();
}

window.onload = this.boot;