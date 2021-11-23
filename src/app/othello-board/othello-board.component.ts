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
  }

}
