let dots = [];
let genomes = [];
//data structure:
/*[{
    path: [{x,y},{x,y},{x,y}],
    fitness: integer
}]
*/
let canvas;
let ctx;
function init() {
    canvas = document.getElementById("tsp_canvas");
    ctx = canvas.getContext("2d");
    canvas.onclick = addDot;
    document.getElementById("clear").onclick = clearCanvas;
    document.getElementById("test").onclick = test;
}

//For testing purposes
function test(){
    newGeneration([dots]);
    console.log(genomes);
}

//Runs when clicking on the screen
function addDot(e) {
    console.log(getMousePos(document.getElementById("tsp_canvas"), e));
    dots.push(getMousePos(document.getElementById("tsp_canvas"), e));
    drawLines();
    drawDots();
    console.log(dots)
}

function drawDots() {
    let array = dots;    
        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            ctx.beginPath();
            ctx.arc(element.x, element.y, 3, 0, 2 * Math.PI);
            ctx.fill();
            ctx.closePath();
            console.log("in loop");
        }
    
}

function getMousePos(canvas, evt) {
    let rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function drawLines() {
    let arr = dots;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(arr[0].x, arr[0].y);
    for (let index = 0; index < arr.length; index++) {
        const element = arr[index];
        ctx.lineTo(element.x, element.y);
    }
    ctx.closePath();
    ctx.stroke();
}

function clearCanvas() {
    dots = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

//Uses the pythagorean theorem to calculate the euclidean distance between all the points
function calcDistance(arr){
    let distance = 0;
    for (let index = 0; index < arr.length; index++) {
        const e1 = arr[index];
        const e2 = arr[(index + 1) % arr.length];
        let a = e1.x - e2.x;
        let b = e1.y - e2.y;
        distance += Math.hypot(a, b)
        
    }
    console.log("distance: ", distance)
    return distance;

}

//Very simple fitness function that is inverse of path length. 
//1000 is arbitrary for a prettier fitness value
function fitness(distance){
    return 1000 / distance;
}

//Input: Single genome array
//Performs a simple swap mutation, randomly swapping a couple alleles.
function mutate(arr){
    let i1 = getRandomInt(0, arr.length);
    let i2 = getRandomInt(0, arr.length);
    
    let placeholder = arr[i1];
    arr[i1] = arr[i2];
    arr[i2] = placeholder;
    return arr;
}

function crossover(arr1, arr2){
    
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

//Helper function for filtering out the variables you want from the genomes array
function getVars(type){
    if(type == "paths"){
        let paths = [];
        genomes.map(x => paths.push(x.path));
        return paths;
    }
    if(type == "fitnesses"){
        let fits = [];
        genomes.map(x => fits.push(x.fitness));
        return fits;
    }
}

//Run the genome function on all paths and update the genomes global variable
//input: genome data structure with multiple paths
function newGeneration(pathlist){
    newGen = [];
    pathlist.map(x => newGen.push(genome(x)))
    genomes = newGen;
}

//Fit a path to the data structure and append the path's fitness
function genome(pathArray){
    return {
        path: pathArray,
        fitness: fitness(calcDistance(pathArray))
    }
}
  

window.onload = init;