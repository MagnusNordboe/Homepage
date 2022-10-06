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
}

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

function calcDistance(arr){
    let distance = 0;
    for (let index = 0; index < arr.length; index++) {
        const e1 = arr[index];
        const e2 = arr[(index + 1) % arr.length];
        let a = e1.x - e2.x;
        let b = e1.y - e2.y;
        distance += Math.hypot(a, b)
        
    }
    return distance;

}

function fitness(arr){
     return arr.map(x => 1 / x);
}

function mutate(arr){
    let a, b = getRandomInt()
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function getVars(type){
    if(type == "paths"){
        let paths = [];
        genomes.map(x => paths.append(x.path));
        return paths;
    }
    if(type == "fitnesses"){
        let fits = [];
        genomes.map(x => fits.append(x.fitness));
        return fits;
    }
}

function newGeneration(pathlist){
    newGen = [];
    pathlist.map(x => newGen.append({}))
}

function genome(pathArray){
    return {
        path: pathArray,
        fitness: fitness(calcDistance(pathArray))
    }
}
  

window.onload = init;