import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss']
})
export class SquareComponent implements OnInit {
  
  @Input() symbol: '1' | '2' | '0' | null

  constructor() {
    this.symbol = null;
  }

  ngOnInit(): void {
  }

}
