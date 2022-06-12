
function init(){
    let canvas = document.getElementById("tsp_canvas");
    canvas.onclick = addDot;
}

function addDot(e){
    console.log(getMousePos(document.getElementById("tsp_canvas"), e));
}

function getMousePos(canvas, evt){
    let rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}
window.onload = init;