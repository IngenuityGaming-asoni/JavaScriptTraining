import {boardA} from "./script.js";
export class Board{
    constructor(ctx,color){
        this.ctx=ctx;
        this.x=1;
        this.y=1;
        this.ROW=15;
        this.COL=15;
        this.SQ=40;
        this.color=color;
    
    }

    drawSquare(x,y,color){
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x*this.SQ,y*this.SQ,this.SQ,this.SQ);
    
        this.ctx.strokeStyle = "lightgrey";
        this.ctx.strokeRect(x*this.SQ,y*this.SQ,this.SQ,this.SQ);
    }

    drawBoard(){
        for( var r = 0; r <this.ROW; r++){
            for(var c = 0; c < this.COL; c++){
                this.drawSquare(c,r,boardA[r][c]);//this.board[r][c]
            }
        }
    }
}