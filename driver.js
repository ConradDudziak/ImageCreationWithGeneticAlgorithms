var running;
var currentInterval;

var popSizeInput;
var polygonCountInput;
var vertexCountInput;
var mutationRateInput;
var resolutionScaleFactorInput;

var outputCanvas;
var outputContext;

var fileInput;
var inputImage;
var inputCanvas;
var inputContext;
var inputImageResWidth;
var inputImageResHeight;

var dataCanvas;
var dataContext;
var dataSizeWidth;
var dataSizeHeight;
var dataSizeScaleFactor;

var targetData;

var mutationRate;
var populationSize;
var polygons;
var vertices;

// Create an instance of the population and iterate
// over its generations.
function startGeneticAlgorithm() {
	population = new Population(dataSizeWidth, dataSizeHeight,
								polygons, vertices,
								targetData, dataContext, 
								mutationRate, populationSize);
	function iterate() {
		population.generate(outputContext, inputImageResWidth, inputImageResHeight);
	}
	
	currentInterval = setInterval(iterate, 0);
}

// Sets the targetData by scaling the inputImage to the dataCanvas.
function setupDataCanvas() {
	inputCanvas.width = dataSizeWidth;
	inputCanvas.height = dataSizeHeight;
	inputContext.drawImage(inputImage, 0, 0, inputImageResWidth, inputImageResHeight, 0, 0, dataSizeWidth, dataSizeHeight);
	
	var rescaledImageData = inputContext.getImageData(0, 0, dataSizeWidth, dataSizeHeight).data;
	
	targetData = [];
	for (var i = 0; i < dataSizeWidth * dataSizeHeight * 4; i++) {
		targetData[i] = rescaledImageData[i];
	}
	
	inputCanvas.width = inputImageResWidth;
	inputCanvas.height = inputImageResHeight;
	outputCanvas.width = inputImageResWidth;
	outputCanvas.height = inputImageResHeight;
	inputContext.drawImage(inputImage, 0, 0);	
}

// Called through HTML GUI button interaction with the start button.
// Begins the genetic algorithm with a new population set.
function startClick() {
	if (!running) {
		running = true;
		startGeneticAlgorithm();	
	}
}

// Called through HTML GUI button interaction with the start button.
// Ends the current genetic algorithm's population set.
function stopClick() {
	clearInterval(currentInterval);
	running = false;
}

// Sets the input image to be the image passed into the inputFile element.
// Re-initilizes the data canvas with the new target data.
function inputFile(){
	var file = fileInput.files[0];
	var reader = new FileReader();
	
	reader.onload = function () {
		var tempImage = new Image();
		tempImage.src = reader.result;
		
		tempImage.onload = function() {
			inputImage.width = this.width;
			inputImage.height = this.height;
			inputImage.src = tempImage.src;
			inputImageResWidth = inputImage.width;
			inputImageResHeight = inputImage.height;
			dataSizeWidth = Math.floor(inputImageResWidth / dataSizeScaleFactor);
			dataSizeHeight = Math.floor(inputImageResHeight / dataSizeScaleFactor);
			setupDataCanvas();
		};
	}

	if (file) {
		reader.readAsDataURL(file); //reads the data as a URL
	} else {
		inputImage.src = "";
	}
}

// Initializes all GA parameters.
function configuration() {
	inputImageResWidth = 350;
	inputImageResHeight = 350;
	dataSizeWidth = 75; // Cannot be greater than inputImageResWidth
	dataSizeHeight = 75; // Cannot be greater than inputImageResHeight
	
	/*
	populationSize = 50;
	polygons = 125;
	vertices = 3;
	mutationRate = 0.01;
	dataSizeScaleFactor = 4.5;
	*/
	
	populationSize = popSizeInput.value;
	console.log(populationSize);
	polygons = polygonCountInput.value;
	console.log(polygons);
	vertices = vertexCountInput.value;
	console.log(vertices);
	mutationRate = mutationRateInput.value;
	console.log(mutationRate);
	dataSizeScaleFactor = resolutionScaleFactorInput.value;
	console.log(dataSizeScaleFactor);
	
	dataCanvas.width = dataSizeWidth;
	dataCanvas.height = dataSizeHeight;
    dataCanvas.style.width = dataSizeWidth;
    dataCanvas.style.height = dataSizeHeight;
	
	running = false;
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
	
	popSizeInput = document.getElementById("populationSize");
	polygonCountInput = document.getElementById("polygonCount");
	vertexCountInput = document.getElementById("vertexCount");
	mutationRateInput = document.getElementById("mutationRate");
	resolutionScaleFactorInput = document.getElementById("resolutionScaleFactor");
	
	configuration();
	
	setupDataCanvas();
}

window.onload = this.boot;