import { Component, OnInit } from '@angular/core';
import { SquareComponent } from '../square/square.component';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-board',
  standalone: true,
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
  imports: [SquareComponent, NgIf, NgFor],
})
export class BoardComponent implements OnInit {
  squares: any[] = [];
  winner = '';
  xisNext = true;
  counter = 0;
  isDraw = false;
  player = '';

  constructor() {}

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.squares = Array(9).fill(null);
    this.winner = '';
    this.xisNext = true;
    this.counter = 0;
    this.isDraw = false;
    this.player = this.getPlayer();
  }

  getPlayer() {
    return this.xisNext ? 'X' : 'O';
  }

  makeMove(idx: number) {
    if (!this.squares[idx]) {
      this.squares[idx] = this.getPlayer();
      this.winner = this.calculateWinner();
      this.xisNext = !this.xisNext;
      this.counter++;

      if (!this.winner && this.counter == 9) {
        this.isDraw = true;
      }

      if (!this.winner) {
        this.player = this.getPlayer();
      }
    }
  }

  calculateWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {
        return this.squares[a];
      }
    }
    return '';
  }
}
