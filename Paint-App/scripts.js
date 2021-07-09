//initializing variable and conditions
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = 600;
var mouse = false;
ctx.lineJoin = "round";
ctx.lineCap = "round";
var positionX, positionY;
var tool='brush';

//Element retrieval 
var brush = document.getElementById("brush"); //Brush 
var eraser = document.getElementById("eraser"); //Eraser 
var color = document.getElementById("colorpick"); //Color
var size = document.getElementById("brushsize"); //Size
var reset = document.getElementById("clearAll"); //reset
var save = document.getElementById("save"); //saveLink element 
var fillcolor =document.getElementById("fcolor");//fill color



//Set initial color conditions 
var currentColor=color.value;
ctx.strokeStyle=currentColor;
//************ for default using brush */
canvas.addEventListener("mousedown", brushDown, false);
canvas.addEventListener("mousemove", brushMove, false);
canvas.addEventListener("mouseup", brushUp, false);


//Function to show coordinates of mouse
canvas.addEventListener('mousemove',(event)=>{
    document.getElementById('coordinate').innerHTML=event.pageX+","+event.pageY;
})


//Function for changing color of brush

function colorpicker(color){
    currentColor=color.value;
    ctx.strokeStyle = currentColor;

 }
// function for fillcolor
function fillColor(fcolor){
    currentFillColor=fcolor.value;
    ctx.fillStyle=currentFillColor;
}
 //funtion of fill button
function fillBtn(cflag){
    if(cflag=='true'){
    var cflag='false';
    }
    // console.log('cflagg'+cflag);
    document.getElementById('fcolor').click();
}
 //Function for brush size
 function brushSize(width){
    ctx.lineWidth=width.value;
}

//Function for getting the coordinates of cursor
function getCoordinates(canvas, e) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: e.clientX - rect.left,
		y: e.clientY - rect.top
	};
}


// Function for making brush work
function brushDraw(positionX, positionY) {
    console.log('draw brush');
	if(mouse) {
		ctx.lineTo(positionX, positionY);
		ctx.stroke();
	}
}

function brushDown(e) {
	mouse = true;
	var coordinates = getCoordinates(canvas, e);
	positionX = coordinates.x;
	positionY = coordinates.y;
	ctx.beginPath();
	ctx.moveTo(positionX, positionY);
}

function brushMove(e) {
	var coordinates = getCoordinates(canvas, e);
	positionX = coordinates.x;
	positionY = coordinates.y;
    ctx.lineTo(positionX, positionY);
    brushDraw(canvas, positionX, positionY);

}

function brushUp() {
	mouse = false;
}

function Brush() {
    console.log('brush');
	var brushColor = document.getElementById("colorpick").value;
	ctx.strokeStyle = brushColor; 
    // console.log('bbcolor'+brushColor);
	eraser.style.border = "none";
	this.removeEvents();
	canvas.addEventListener("mousedown", brushDown, false); //bubble phase
	canvas.addEventListener("mousemove", brushMove, false);
	canvas.addEventListener("mouseup", brushUp, false);
}

// Making the eraser work 
function erase(){
    // console.log('eraser called');
    // ctx.globalCompositeOperation="destination-out";
	ctx.strokeStyle = "white";
	brush.style.border = "none";
	
    this.removeEvents();
	canvas.addEventListener("mousedown", brushDown, false);
	canvas.addEventListener("mousemove", brushMove, false);
	canvas.addEventListener("mouseup", brushUp, false);

}

// ********* Clearing the Screen **********
function clearAll(){
     ctx.clearRect(0,0,window.innerWidth,600);
 }

// Making the save button work 
function Save(el){
    // console.log(ctx);
   
        // console.log(canvas.toDataURL());
        const link = document.createElement('a');
        link.download = 'download.png';
        link.href = canvas.toDataURL();
        link.click();
        link.delete;

    var image = canvas.toDataURL("image/jpg");
    el.href = image;
}


//
// ******* DRAWING RECTANGLE ********

// Using getImageData function get the previous data and store in imgData variable.
function copy(){
    imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
}

// Put previous data using putImageData function.
function paste() {
    ctx.putImageData(imgData, 0, 0);
}

function drawRect(position) {
    // console.log('drawrect in ');
    ctx.strokeRect(position.x, position.y, dragStartPoint.x - position.x, dragStartPoint.y - position.y);
    ctx.fillRect(position.x, position.y, dragStartPoint.x - position.x, dragStartPoint.y - position.y);
} 

// ON MOUSEDOWN 
function dragStart(event) {
    mouse = true;
    dragStartPoint = getCoordinates(canvas,event);
    copy();
}
//on MOUSEOVER
function drag(event) {
    var position;
    if (mouse === true) {
        paste();
        position = getCoordinates(canvas,event);

        drawRect(position);
    }
}
//ON MOUSEUP
function dragStop(event) {
    mouse = false;
    paste();
    var position = getCoordinates(canvas,event);
    drawRect(position);
}  

// function called on clicking rectangle icon
function rectangle(){
    // console.log('rect()');
	var brushColor = document.getElementById("colorpick").value;
	ctx.strokeStyle = brushColor; 
    if(this.cflag=='true'){
    var fillcolor=document.getElementById('fcolor').value;
    ctx.fillStyle=fillcolor;
    }else{
        ctx.fillStyle='rgba(0,0,0,0.0)';
    }
    // console.log('bgccccc'+fillcolor);
    // console.log('bcolor'+brushColor);
	this.removeEvents()
	canvas.addEventListener("mousedown", dragStart, false); //bubble phase
	canvas.addEventListener("mousemove", drag, false);
	canvas.addEventListener("mouseup",dragStop, false);
}


// ************** Drawing a LINE ****************


function drawLine(coord2){
    // console.log('drawingline');
    ctx.lineTo(coord2.x , coord2.y);
    ctx.stroke();
}

function lineStart(event){
    mouse = true;
    coord=getCoordinates(canvas,event);
    ctx.beginPath();
    ctx.moveTo(coord.x , coord.y);
    // copy();
  }
  function lineing(event){
    //   console.log('lining');
    if (mouse===true){
        // paste();
        coord1=getCoordinates(canvas,event);
        // console.log(coord);
        ctx.stroke();

    }
  }

  function lineStop(event){
    mouse = false;
    // paste();
    coord2=getCoordinates(canvas,event);
    // ctx.globalCompositeOperation= "source-over";
    drawLine(coord2);
  }

//function to draw a line 
function line(){
    // console.log('func line called');
    var brushColor = document.getElementById("colorpick").value;
	ctx.strokeStyle = brushColor; 
    // console.log('bcolor'+brushColor);

    this.removeEvents();
    canvas.addEventListener("mousedown", lineStart , false); //bubble phase
	canvas.addEventListener("mousemove", lineing, false);
	canvas.addEventListener("mouseup",lineStop , false);

}

//********** FOR DRAWING ELLIPSE/CIRCLE ***************

function drawEllipse(eposition){
    // console.log('draw ellipse')
    var radiusX = (x2 - x1) * 0.5,   /// radius for x based on input
        radiusY = (y2 - y1) * 0.5,   /// radius for y based on input
        centerX = x1 + radiusX,      /// calc center
        centerY = y1 + radiusY,
        step = 0.01,                 /// resolution of ellipse
        a = step,                    /// counter
        pi2 = Math.PI * 2 - step;    /// end angle
    
    /// start a new path
    ctx.beginPath();
    // set start point at angle 0
    ctx.moveTo(centerX + radiusX * Math.cos(0),
               centerY + radiusY * Math.sin(0));
    /// create the ellipse    
    for(; a < pi2; a += step) {
        ctx.lineTo(centerX + radiusX * Math.cos(a),
                   centerY + radiusY * Math.sin(a));
    }

    /// close it and stroke it for demo
    ctx.closePath();
    ctx.fill();
    ctx.stroke();



}
function ellipseStart(event){
    mouse='true';
    ellStartPoint = getCoordinates(canvas,event);
    copy();
    x1=ellStartPoint.x;
    y1=ellStartPoint.y;

}
function ellipsedrag(event){
    var eposition;
    if(mouse==='true'){
        paste();
        eposition = getCoordinates(canvas,event);
        x2=eposition.x;
        y2=eposition.y;
        drawEllipse(x1,y1,x2,y2);
    }

}
function ellipseStop(event){
    mouse='false';
    paste();
    var esposition = getCoordinates(canvas,event);
    x2=esposition.x;
        y2=esposition.y;
    drawEllipse(x1,y1,x2,y2);
}



function ellipse(){
    // console.log('ellipse called');
    var brushColor = document.getElementById("colorpick").value;
	ctx.strokeStyle = brushColor; 
    // console.log('ccolor'+brushColor);
    if(this.cflag ==='true'){
        // console.log('elipse tru');
        var fillcolor=document.getElementById('fcolor').value;
        ctx.fillStyle=fillcolor;
        // console.log('filllllll'+fillcolor);
        ctx.fill();
        }else{
            // console.log('elipse fals');
            ctx.fillStyle='rgba(0,0,0,0.0)';
            ctx.fill();
        }


    this.removeEvents();
    canvas.addEventListener("mousedown", ellipseStart , false);
	canvas.addEventListener("mousemove", ellipsedrag, false);
	canvas.addEventListener("mouseup",ellipseStop , false);

}















//REMOVING ALL CURRENTLY ACTIVE EVENT LISTNERSSSSS
function removeEvents(){
    //removing events of rectangle
    canvas.removeEventListener("mousedown", dragStart, false);
    canvas.removeEventListener("mousemove", drag, false);
	canvas.removeEventListener("mouseup",dragStop, false);

        //removing events of brush,eraser
    canvas.removeEventListener("mousedown", brushDown, false); //bubble phase
	canvas.removeEventListener("mousemove", brushMove, false);
	canvas.removeEventListener("mouseup", brushUp, false);

    //removing events of line
    canvas.removeEventListener("mousedown", lineStart , false); //bubble phase
	canvas.removeEventListener("mousemove", lineing, false);
	canvas.removeEventListener("mouseup",lineStop , false);
    
    //removing events of ellipse
    canvas.removeEventListener("mousedown", ellipseStart , false); //bubble phase
	canvas.removeEventListener("mousemove", ellipsedrag, false);
	canvas.removeEventListener("mouseup",ellipseStop , false);
}