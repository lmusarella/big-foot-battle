import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GridItem } from '../../model/gridItem';
import { Player } from '../../model/player';

@Component({
  selector: 'app-selection-component',
  templateUrl: './selectionViewComponent.html',
  styleUrls: ['./selectionViewComponent.scss']
})
export class SelectionViewComponent implements OnInit {
  @Input()
  playersInput: GridItem[] = [];
  @Output()
  listTopPlayersOutPut = new EventEmitter<GridItem[]>();
  @Output()
  closeSelectionView = new EventEmitter<boolean>();

  singlePlayerMatch = false;
  firstPlayer: Player = null;
  interval = 0;
  textTransiction: string = null;
  transiction = false;
  listTopPlayers: GridItem[] = [];
  players: GridItem[] = [];
  isAble = true;
  countBattle = 1;
  defaultBorder = '3px' + ' solid ' + '#000000';
  yellowBorder = '3px' + ' solid ' + '#ccff00';
  redBorder = '3px' + ' solid ' + '#FF0000';
  blueBorder = '3px' + ' solid ' + '#0000FF';
  constructor() {
  }
  ngOnInit() {
    console.log('ciao sono dentro!');
    this.players = this.playersInput;
  }
  showModal() {
    this.isAble = false;
    this.searchingTarget(() => {
      this.choosePlayer();
      setTimeout(() => {
        this.singlePlayerMatch = !this.singlePlayerMatch;
        this.isAble = true;
      }, 1000);
    });
  }
  closeView(event) {
    this.singlePlayerMatch = event;
  }
  choosePlayer() {
    let range = this.players.length;
    let firstPlayerIndex = Math.floor(Math.random() * range);
    console.log('primo indice: ' + firstPlayerIndex);
    while (this.firstPlayer === null || this.firstPlayer.isEliminated || this.firstPlayer.isSelected) {
      this.players.forEach((element, index) => {
        if (index === firstPlayerIndex && (!element.player.isEliminated && !element.player.isSelected)) {
          console.log('primo giocatore trovato: ' + element.text);
          element.bord = this.redBorder;
          this.firstPlayer = element.player;
        } else if (index === firstPlayerIndex && (element.player.isEliminated || element.player.isSelected)) {
          firstPlayerIndex = Math.floor(Math.random() * range);
        }
      });
    }
  }

  searchingTarget(callBack: Function) {
    this.interval -= 20;
    let self = this;
    let indexRandom = Math.floor(Math.random() * this.players.length);
    let gridItemPlayer1 = this.players[indexRandom];
    gridItemPlayer1.bord = (gridItemPlayer1.player.isSelected || gridItemPlayer1.player.isEliminated) ? gridItemPlayer1.bord : this.redBorder;
    if (this.interval <= -1000) {
      gridItemPlayer1.bord = (gridItemPlayer1.player.isSelected || gridItemPlayer1.player.isEliminated) ? gridItemPlayer1.bord : this.defaultBorder;
      this.interval = 0;
      callBack();
      return;
    }
    setTimeout(function () {
      gridItemPlayer1.bord = (gridItemPlayer1.player.isSelected || gridItemPlayer1.player.isEliminated) ? gridItemPlayer1.bord : self.defaultBorder;
      self.searchingTarget(callBack);
    }, this.interval);
  }

  setWinner(event: Player) {
    this.firstPlayer = null;
    this.players.forEach(element => {
      if (element.player.id === event.id) {
        if (element.player.isSelected) {
          let gridItem = new GridItem();
          gridItem = element;
          this.listTopPlayers.push(gridItem);
          element.bord = this.yellowBorder;
        } else if (element.player.isEliminated) {
          element.secImg = './assets/foto/X.png';
          element.bord = this.redBorder;
        }
      }
    });
    if (this.listTopPlayers.length === 4) {
      this.showTransictionView(() => {
          this.transiction = false;
          this.listTopPlayersOutPut.emit(this.listTopPlayers);
          this.closeSelectionView.emit(false);
      });
    }
  }

  showTransictionView(callBack: Function) {
    this.transiction = true;
    this.textTransiction = 'Selezione conclusa... Inizio Battle';
    setTimeout(() => {
      callBack();
     }, 300000);
  }

  closeTransictionView(event) {
    this.transiction = event;
  }
}





