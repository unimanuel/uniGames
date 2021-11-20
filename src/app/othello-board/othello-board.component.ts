import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-othello-board',
  templateUrl: './othello-board.component.html',
  styleUrls: ['./othello-board.component.scss']
})
export class OthelloBoardComponent implements OnInit {

  squares : any[];

  constructor() { }

  ngOnInit(): void {
    this.squares = Array(64).fill(null);
  }

}
