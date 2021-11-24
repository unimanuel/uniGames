import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-othello-board',
  templateUrl: './othello-board.component.html',
  styleUrls: ['./othello-board.component.scss']
})
export class OthelloBoardComponent implements OnInit {

  squares : any[];
  descr = 'test1';
  whosturn = 'X';
  winner : string | null;
  dbgMsg : string;

  constructor() { }

  ngOnInit(): void {
    this.squares = Array(64).fill(null);
  }

  newGame() {
    this.squares = Array(64).fill('O');
  }

  clearBoard() {
    this.squares = Array(64).fill(null);
  }

  makeMove(idx: number) {
    this.squares.splice(idx, 1, this.whosturn);
    this.whosturn = this.whosturn == 'X' ? 'O' : 'X';

    this.flipSquares(idx);
  }

  boardMat(x: number, y: number)
  {
    return y * 8 + x;
  }

  // oppTurn(currTurn : string)
  // {
  //   if (currTurn == 'O') {
  //     return 'X'
  //   }
  //   else {
  //     return 'O'
  //   }
  // }

  flipSquares(idx: number) {
    var y = Math.floor(idx / 8)
    let x = Math.floor(idx - 8 * y)

    let currTurn = this.squares[this.boardMat(x,y)]
    let oppTurn;
    
    if (currTurn == 'O') {
      oppTurn = 'X'
    }
    else {
      oppTurn = 'O'
    }
    // return currTurn + " " + x + " " + y + " " + this.boardMat(x,y)
    let i = x, j = y
    let finalFlips : [number,number][] = []

    let flips : [number,number][] = []
    i = x, j = y
    //down right
    while (i < 7 && j < 7) {
      i++
      j++
      if (this.squares[this.boardMat(i,j)] == null) {
        flips = []
      }
      if (this.squares[this.boardMat(i,j)] == oppTurn) {
        flips.push([i,j])
      }
      else {
        break
      }
      if (i >= 7 || j >= 7) {
        flips = []
      }
    }
    flips.forEach( (flip) => finalFlips.push(flip))

    flips = []
    i = x, j = y
    //down left
    while (i > 0 && j < 7) {
      i--
      j++
      if (this.squares[this.boardMat(i,j)] == null) {
        flips = []
      }
      if (this.squares[this.boardMat(i,j)] == oppTurn) {
        flips.push([i,j])
      }
      else {
        break
      }
      if (i <= 0 || j >= 7) {
        flips = []
      }
    }
    flips.forEach( (flip) => finalFlips.push(flip))
    
    flips = []
    i = x, j = y
    //up left
    while (i > 0 && j > 0) {
      i--
      j--
      if (this.squares[this.boardMat(i,j)] == null) {
        flips = []
      }
      if (this.squares[this.boardMat(i,j)] == oppTurn) {
        flips.push([i,j])
      }
      else {
        break
      }
      if (i <= 0 || j <= 0) {
        flips = []
      }
    }
    flips.forEach( (flip) => finalFlips.push(flip))
    
    flips = []
    i = x, j = y
    //up right
    while (i < 7 && j > 0) {
      i++
      j--
      if (this.squares[this.boardMat(i,j)] == null) {
        flips = []
      }
      if (this.squares[this.boardMat(i,j)] == oppTurn) {
        flips.push([i,j])
      }
      else {
        break
      }
      if (i >= 7 || j <= 0) {
        flips = []
      }
    }
    flips.forEach( (flip) => finalFlips.push(flip))
    
    flips = []
    i = x, j = y
    //right
    while (i < 7) {
      i++
      if (this.squares[this.boardMat(i,j)] == null) {
        flips = []
      }
      if (this.squares[this.boardMat(i,j)] == oppTurn) {
        flips.push([i,j])
      }
      else {
        break
      }
      if (i >= 7) {
        flips = []
      }
    }
    flips.forEach( (flip) => finalFlips.push(flip))
    
    flips = []
    i = x, j = y
    //down
    while (j < 7) {
      j++
      if (this.squares[this.boardMat(i,j)] == null) {
        flips = []
      }
      if (this.squares[this.boardMat(i,j)] == oppTurn) {
        flips.push([i,j])
      }
      else {
        break
      }
      if (j >= 7) {
        flips = []
      }
    }
    flips.forEach( (flip) => finalFlips.push(flip))
    
    flips = []
    i = x, j = y
    //left
    while (i > 0) {
      i--
      if (this.squares[this.boardMat(i,j)] == null) {
        flips = []
      }
      if (this.squares[this.boardMat(i,j)] == oppTurn) {
        flips.push([i,j])
      }
      else {
        break
      }
      if (i <=0) {
        flips = []
      }
    }
    flips.forEach( (flip) => finalFlips.push(flip))
    
    flips = []
    i = x, j = y
    //up
    while (j > 0) {
      j--
      if (this.squares[this.boardMat(i,j)] == null) {
        flips = []
      }
      if (this.squares[this.boardMat(i,j)] == oppTurn) {
        flips.push([i,j])
      }
      else {
        break
      }
      if (j <= 0) {
        flips = []
      }
    }
    flips.forEach( (flip) => finalFlips.push(flip))
    
    flips = []

    finalFlips.forEach( (flip) => {
      // this.dbgMsg = "length " + flips.length + " i" + i + " j" + j + "x" + x + " x" + y + " f0" + flip[0] + " f1" + flip[1]
      // this.dbgMsg = "" + flips[0]
      this.squares[this.boardMat(flip[0], flip[1])] = currTurn;
    })
  }

  checkEnd(idx: number) : string | null
  {
    return null
  }

}
