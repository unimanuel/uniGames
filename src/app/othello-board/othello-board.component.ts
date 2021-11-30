import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-othello-board',
  templateUrl: './othello-board.component.html',
  styleUrls: ['./othello-board.component.scss']
})
export class OthelloBoardComponent implements OnInit {

  squares : any[];
  hintSquares: any[]
  descr = 'test1';
  whosturn = 'X';
  winner : string | null;
  dbgMsg : string;

  constructor() { }

  ngOnInit(): void {
    this.squares = Array(64).fill(null);
    this.newGame();
  }

  newGame() {
    this.winner = null;
    this.dbgMsg = ""
    this.squares = Array(64).fill(null);
    this.squares[27] = 'X';
    this.squares[28] = 'O';
    this.squares[35] = 'O';
    this.squares[36] = 'X';
    this.setPossibleSquares();
  }

  clearBoard() {
    this.squares = Array(64).fill(null);
  }

  makeMove(idx: number) {
    if (this.winner == null) {
      this.dbgMsg = ""
    }
    if (this.squares[idx] == this.whosturn.toLowerCase()) {
      this.squares.splice(idx, 1, this.whosturn);
      this.whosturn = this.whosturn == 'X' ? 'O' : 'X';

      this.flipSquares(idx);
      this.resetPossibleSquares();
      this.setPossibleSquares();
      this.winner = this.checkWinner();
    }
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

  checkWinner() : string | null
  {
    let xCount = 0, oCount = 0
    let notDone : boolean
    for (let i = 0; i < 64; i++) {
      if (this.squares[i] == 'x' || this.squares[i] == 'o') { //little x and o existence determines if finished, no null check needed.
        return null;
      }
      this.squares[i] == 'X' ? xCount ++ : this.squares[i] == 'O' ? oCount ++ : null;
    }
    if (xCount == oCount) {
      return "Tie!"
    }
    else {
      this.dbgMsg = "xcount" + xCount + "oCount" + oCount
      return xCount > oCount ? 'X' : 'O'
    }
  }

  resetPossibleSquares()
  {
    for (let n = 0; n < 64; n++) {
      if (this.squares[n] == 'x' || this.squares[n] == 'o') {
        this.squares[n] = null
      }
    }

  }
  setPossibleSquares()
  {
    let flipped = this.loopPossibleSquares();
    if (!flipped) {
      this.resetPossibleSquares();
      this.whosturn = this.whosturn == 'X' ? 'O' : 'X';
      flipped = this.loopPossibleSquares();
      if (flipped) {
        this.dbgMsg = "Turn skipped because no valid plays! Current turn: " + this.whosturn
      }
      else {
        this.resetPossibleSquares();
        this.dbgMsg = "Both sides have no more plays! Determining winner..."
      }
    }
  }
  loopPossibleSquares() : boolean  {
    let flipped = false;
    for (let n = 0; n < 64; n++) {
      if (this.squares[n] == this.whosturn) {
        let thisflip = this.possibleSquares(n)
        flipped = flipped ? true : thisflip
      }
    }
    return flipped;
  }
  possibleSquares(idx: number) : boolean {
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
    
    if (this.squares[this.boardMat(x+1,y+1)] == oppTurn) {
      i = x, j = y
      //down right
      while (i < 7 && j < 7) {
        i++
        j++
        if (this.squares[this.boardMat(i,j)] == null) {
          flips.push([i,j])
          break
        }
        if (this.squares[this.boardMat(i,j)] == currTurn) {
          flips = []
          break
        }
        if (this.squares[this.boardMat(i,j)] != oppTurn) { //already marked so don't skip.
          flips = []
          break
        }
        if (i >= 7 || j >= 7) {
          flips = []
        }
      }
      flips.forEach( (flip) => finalFlips.push(flip))
    }

    flips = []
    if (this.squares[this.boardMat(x-1,y+1)] == oppTurn) {
      i = x, j = y
      //down left
      while (i > 0 && j < 7) {
        i--
        j++
        if (this.squares[this.boardMat(i,j)] == null) {
          flips.push([i,j])
          break
        }
        if (this.squares[this.boardMat(i,j)] == currTurn) {
          flips = []
          break
        }
        if (this.squares[this.boardMat(i,j)] != oppTurn) { //already marked so don't skip.
          flips = []
          break
        }
        if (i <= 0 || j >= 7) {
          flips = []
        }
      }
      flips.forEach( (flip) => finalFlips.push(flip))
    }
    
    flips = []
    if (this.squares[this.boardMat(x-1,y-1)] == oppTurn) {
      i = x, j = y
      //up left
      while (i > 0 && j > 0) {
        i--
        j--
        if (this.squares[this.boardMat(i,j)] == null) {
          flips.push([i,j])
          break
        }
        if (this.squares[this.boardMat(i,j)] == currTurn) {
          flips = []
          break
        }
        if (this.squares[this.boardMat(i,j)] != oppTurn) { //already marked so don't skip.
          flips = []
          break
        }
        if (i <= 0 || j <= 0) {
          flips = []
        }
      }
      flips.forEach( (flip) => finalFlips.push(flip))
    }
    
    flips = []
    if (this.squares[this.boardMat(x+1,y-1)] == oppTurn) {
      i = x, j = y
      //up right
      while (i < 7 && j > 0) {
        i++
        j--
        if (this.squares[this.boardMat(i,j)] == null) {
          flips.push([i,j])
          break
        }
        if (this.squares[this.boardMat(i,j)] == currTurn) {
          flips = []
          break
        }
        if (this.squares[this.boardMat(i,j)] != oppTurn) { //already marked so don't skip.
          flips = []
          break
        }
        if (i >= 7 || j <= 0) {
          flips = []
        }
      }
      flips.forEach( (flip) => finalFlips.push(flip))
    }
    
    flips = []
    if (this.squares[this.boardMat(x+1,y)] == oppTurn) {
      i = x, j = y
      //right
      while (i < 7) {
        i++
        if (this.squares[this.boardMat(i,j)] == null) {
          flips.push([i,j])
          break
        }
        if (this.squares[this.boardMat(i,j)] == currTurn) {
          flips = []
          break
        }
        if (this.squares[this.boardMat(i,j)] != oppTurn) { //already marked so don't skip.
          flips = []
          break
        }
        if (i >= 7) {
          flips = []
        }
      }
      flips.forEach( (flip) => finalFlips.push(flip))
    }
    
    flips = []
    if (this.squares[this.boardMat(x,y+1)] == oppTurn) {
      i = x, j = y
      //down
      while (j < 7) {
        j++
        if (this.squares[this.boardMat(i,j)] == null) {
          flips.push([i,j])
          break
        }
        if (this.squares[this.boardMat(i,j)] == currTurn) {
          flips = []
          break
        }
        if (this.squares[this.boardMat(i,j)] != oppTurn) { //already marked so don't skip.
          flips = []
          break
        }
        if (j >= 7) {
          flips = []
        }
      }
      flips.forEach( (flip) => finalFlips.push(flip))
    }
    
    flips = []
    if (this.squares[this.boardMat(x-1,y)] == oppTurn) {
      i = x, j = y
      //left
      while (i > 0) {
        i--
        if (this.squares[this.boardMat(i,j)] == null) {
          flips.push([i,j])
          break
        }
        if (this.squares[this.boardMat(i,j)] == currTurn) {
          flips = []
          break
        }
        if (this.squares[this.boardMat(i,j)] != oppTurn) { //already marked so don't skip.
          flips = []
          break
        }
        if (i <=0) {
          flips = []
        }
      }
      flips.forEach( (flip) => finalFlips.push(flip))
    }
    
    flips = []
    if (this.squares[this.boardMat(x,y-1)] == oppTurn) {
      i = x, j = y
      //up
      while (j > 0) {
        j--
        if (this.squares[this.boardMat(i,j)] == null) {
          flips.push([i,j])
          break
        }
        if (this.squares[this.boardMat(i,j)] == currTurn) {
          flips = []
          break
        }
        if (this.squares[this.boardMat(i,j)] != oppTurn) { //already marked so don't skip.
          flips = []
          break
        }
        if (j <= 0) {
          flips = []
        }
      }
      flips.forEach( (flip) => finalFlips.push(flip))
    }
    
    flips = []

    let flipped : boolean = false
    finalFlips.forEach( (flip) => {
      // this.dbgMsg = "length " + flips.length + " i" + i + " j" + j + "x" + x + " x" + y + " f0" + flip[0] + " f1" + flip[1]
      // this.dbgMsg = "" + flips[0]
      this.squares[this.boardMat(flip[0], flip[1])] = String(currTurn).toLowerCase();
      flipped = true;
    })

    // if (!flipped) {
    //   this.whosturn = this.whosturn == 'X' ? 'O' : 'X';
    // }

    // For testing early ending by skipping turn.
    // if (Math.random() > 0.4 && currTurn == 'O') {
    //   finalFlips = []
    // }
    if (finalFlips.length == 0) {
      return false;
      // this.whosturn = this.whosturn == 'X' ? 'O' : 'X';
      // this.dbgMsg = "Turn skipped because no valid plays! Current turn: " + this.whosturn
    }
    return true;
    // this.dbgMsg = "" + this.squares
  }

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
}
