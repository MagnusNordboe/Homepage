let dots = [];
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

//FINISH THIS
function calcDistance(arr){
    let distance = 0;
    for (let index = 0; index < arr.length; index++) {
        const element = arr[index];
        let a = element.x
        //distance += 
    }
}
window.onload = init;