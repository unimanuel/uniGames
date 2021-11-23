import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SquareComponent } from './square/square.component';
import { OthelloBoardComponent } from './othello-board/othello-board.component';

import {MatButtonModule} from '@angular/material/button';
// import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    SquareComponent,
    OthelloBoardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    // MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
