import { Board } from "./board.js";
import { Pieces} from "./pieces.js";
import { Termino } from "./termino.js";
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width=600;
canvas.height=600;
const ROW = 15;
const COL = 15;
let  score=0;
var req;
var playing='true';
let t= new Termino;

const PIECES = [
    [t.Z,"red"],
    [t.S,"green"],
    [t.T,"yellow"],
    [t.O,"blue"], 
    [t.L,"purple"],
    [t.I,"cyan"],
    [t.J,"orange"]
];
let color='white';
var boardA=[];
    for( var r = 0; r <COL; ++r){
        boardA[r] = [];
        for(var c = 0; c < ROW; ++c){
            boardA[r][c] =color ;
        }
    } 
// console.log(boardA);
export {boardA,gameOver};
export{score};
let board=new Board(ctx,color);
document.addEventListener("keydown",control);

function randomPiece(){
    let r = Math.floor(Math.random() * PIECES.length) // 0 -> 6
    return new Pieces(ctx, PIECES[r][0],PIECES[r][1],COL,ROW);
}

// let backgroundSound = new Audio('./sound/background.mp3');
let p = randomPiece();
board.drawBoard(color);
let dropStart = Date.now();
let gameOver = false;
function play(){
    // backgroundSound.play().loop();

    let now = Date.now();
    let delta = now - dropStart;
    if(delta > 1000){
        let drop=p.moveDown();
        if(drop){
        }
        else{
            draw();
        }
        dropStart = Date.now();
    }
    if( !gameOver){
    req=requestAnimationFrame(play);
}
}
play();
function draw(){
    p=randomPiece();
}
// CONTROL 
function control(event){
    // console.log(event);
    if(event.keyCode == 37){
        if(playing=='true'){
            p.moveLeft();
            dropStart = Date.now();
        }
    }else if(event.keyCode == 38){
        if(playing=='true'){
            p.rotate();
            dropStart = Date.now();
        }
    }else if(event.keyCode == 39){
        if(playing=='true'){
            p.moveRight();
            dropStart = Date.now();
        }
    }else if(event.keyCode == 40){
        if(playing=='true'){
            p.moveDown();
        }
        // pause();
    }
    else if(event.keyCode==32){
    //    var playing='false';
        console.log('playing on space " '+playing);
        pause();
        // console.log('space chala');
    }
    function pause(){
        if (playing=='false'){
            req=requestAnimationFrame(play);
            playing='true';
        }
        else{
            playing='false';
        
            cancelAnimationFrame(req);            
        }
    }
}