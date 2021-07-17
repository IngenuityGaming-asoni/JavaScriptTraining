import { Board } from "./board.js";
import {boardA} from "./script.js";
let score=0;
let gameover='false';
class Pieces{
    constructor(ctx,brick,color,COL,ROW){
        this.ctx=ctx;
        this.brick = brick;
        this.color = color;
        this.COL=COL;
        this.ROW=ROW;
        this.p=null;
        this.brickN = 0; // we start from the first pattern
        this.activebrick = this.brick[this.brickN];
        this.board=new Board(this.ctx,this.color);
        // we need to control the pieces
        this.x = 6;
        this.y = -2;        
        this.dropSound = new Audio("./sound/block-drop.mp3");
        this.rotateSound = new Audio("./sound/block-rotate.mp3");
        this.removeLineSound = new Audio("./sound/line-remove.mp3");
        this.gameoverSound = new Audio('./sound/gameover.wav');
        
    }
    gameOver(){
        gameover='true';
        // this.gameoverSound.play();
        document.getElementById('gameover').style.visibility='visible';
        cancelAnimationFrame(req);
        
    }
    
    fill(color){
        for( let r = 0; r < this.activebrick.length; r++){
            for(let c = 0; c < this.activebrick.length; c++){
                // we draw only occupied squares
                if( this.activebrick[r][c]){
                    this.board.drawSquare(this.x + c,this.y + r, color);
                }
            }
        }
    }
    draw(){
        this.fill(this.color);
    }
    unDraw(){
        this.fill('white');
    }
    moveDown(){
        if(!this.collision(0,1,this.activebrick)){
            this.unDraw();
            this.y++;
            this.draw();
            this.dropSound.play();
            return true;
        }else{
            // we lock the piece and generate a new one
            this.lock(this.x,this.y,this.activebrick);
            return false;
        }
        
    }

    moveRight(){
        if(!this.collision(1,0,this.activebrick)){
            this.unDraw();
            this.x++;
            this.draw();
        }
    }
    moveLeft = function(){
        if(!this.collision(-1,0,this.activebrick)){
            this.unDraw();
            this.x--;
            this.draw();
        }
    }
    rotate(){
        let nextPattern = this.brick[(this.brickN + 1)%this.brick.length];
        let kick = 0;
        
        if(this.collision(0,0,nextPattern)){
            if(this.x > this.COL/2){
                // it's the right wall
                kick = -1; // we need to move the piece to the left
            }else{
                // it's the left wall
                kick = 1; // we need to move the piece to the right
            }
        }
        
        if(!this.collision(kick,0,nextPattern)){
            this.unDraw();
            this.x += kick;
            this.brickN = (this.brickN + 1)%this.brick.length; // (0+1)%4 => 1
            this.activebrick = this.brick[this.brickN];
            this.draw();
            this.rotateSound.play();
        }
    }



    lock(){
        for( var r = 0; r < this.activebrick.length; r++){
            for(var c = 0; c < this.activebrick.length; c++){
                // we skip the vacant squares
                if( !this.activebrick[r][c]){
                    continue;
                }
                // pieces to lock on top = game over
                if(this.y + r < 0){
                   
                    this.gameoverSound.play();
                    this.gameOver();
                    break;
                }
                // we lock the piece
                boardA[this.y+r][this.x+c] = this.color;
                // score+=10;
            }
        }
        // remove full rows
        for(var r = 0; r < this.ROW; r++){
            let isRowFull = true;
            for(var c = 0; c < this.COL; c++){
                isRowFull = isRowFull && (boardA[r][c] != 'white');
            }
            if(isRowFull){
                // if the row is full
                // we move down all the rows above it
                for( var s = r; s > 1; s--){
                    for( var c = 0; c < this.COL; c++){
                        boardA[s][c] = boardA[s-1][c];
                    }
                }
                // the top row board[0][..] has no row above it
                for( var c = 0; c < this.COL; c++){
                    boardA[0][c] = 'white';
                }
                // increment the score
                // console.log(score);
                score += 100;
                this.removeLineSound.play();
            }
        } 
        // update the board
        this.board.drawBoard();

        // update the score
        document.getElementById('scoreboard').innerHTML=score;
    }

// Collision detection    
    collision(x,y,piece){
        for( var r = 0; r < piece.length; r++){
            for(var c = 0; c < piece.length; c++){
                // if the square is empty, we skip it
                if(!piece[r][c]){
                    continue;
                }
                // coordinates of the piece after movement
                let newX = this.x + c + x;
                let newY = this.y + r + y;
                
                // conditions
                if(newX < 0 || newX >= this.COL || newY >= this.ROW){
                    return true;
                }
                // skip newY < 0; board[-1] will crush our game
                if(newY < 0){
                    continue;
                }
                // check if there is a locked piece alrady in place
                if( boardA[newY][newX] != 'white'){
                    // console.log(boardA);
                    return true;
                }
            }
        }
        return false;
    }   
}
export {Pieces};