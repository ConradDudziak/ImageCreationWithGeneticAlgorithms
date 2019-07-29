var running;
var currentInterval;

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
	console.log("Trying to setup dataCanvas");
	inputCanvas.width = dataSizeWidth;
	console.log("Width" + inputCanvas.width);
	inputCanvas.height = dataSizeHeight;
	console.log("Height" + inputCanvas.height);
	inputContext.drawImage(inputImage, 0, 0, inputImageResWidth, inputImageResHeight, 0, 0, dataSizeWidth, dataSizeHeight);
	
	var rescaledImageData = inputContext.getImageData(0, 0, dataSizeWidth, dataSizeHeight).data;
	console.log(rescaledImageData);
	
	targetData = [];
	for (var i = 0; i < dataSizeWidth * dataSizeHeight * 4; i++) {
		targetData[i] = rescaledImageData[i];
	}
	
	inputCanvas.width = inputImageResWidth;
	console.log(inputCanvas.width);
	inputCanvas.height = inputImageResHeight;
	console.log(inputCanvas.height);
	inputContext.drawImage(inputImage, 0, 0);
	console.log(inputImage);	
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

function inputFile(){
	//var preview = document.querySelector('img'); //selects the query named img
	//inputImage
	var file = fileInput.files[0]; //sames as here
	var reader = new FileReader();
	
	reader.onload = function () {
		inputImage.src = reader.result;
		inputImageResWidth = inputImage.width;
		inputImageResHeight = inputImage.height;
		dataSizeWidth = 75;
		dataSizeHeight = 75;
		// Scale or reconfigure??
		setupDataCanvas();
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
	dataSizeWidth = 75; // Cannot be greater than inputImageRes
	dataSizeHeight = 75; // Cannot be greater than inputImageRes
	
	populationSize = 50;
	polygons = 125;
	vertices = 3;
	mutationRate = 0.01;
	
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
	
	configuration();
	
	setupDataCanvas();
}

window.onload = this.boot;