import { Component, OnInit } from '@angular/core';
import { GenericService } from '../service/genericService';
import { GridItem } from '../model/gridItem';
import { Player } from '../model/player';

@Component({
  selector: 'app-home-page-component',
  templateUrl: './homePageViewComponent.html',
  styleUrls: ['./homePageViewComponent.scss']
})
export class HomePageViewComponent implements OnInit {
  title = 'app';
  matchingPlayer = false;
  firstPlayerIndex = 0;
  secondPlayerIndex = 0;
  firstPlayer: Player = null;
  secondPlayer: Player = null;
  interval = 500;
  isAble = true;
  countBattle = 0;
  defaultBorder = '3px' + ' solid ' + '#000000';
  greenBorder = '3px' + ' solid ' + '#00FF00';
  redBorder = '3px' + ' solid ' + '#FF0000';
  blueBorder = '3px' + ' solid ' + '#0000FF';
  players: GridItem[] = [];
  constructor(private genericService: GenericService) {
  }
  ngOnInit() {
    this.gridInitialize();
  }
  showModal() {
    this.isAble = false;
    this.searchingTarget(() => {
      this.choosePlayer();
      setTimeout(() => {
        this.matchingPlayer = !this.matchingPlayer;
        this.isAble = true;
      }, 1000);
    });
  }
  closeView(event) {
    this.matchingPlayer = event;
  }
  choosePlayer() {
    this.nextBattle();
    this.firstPlayerIndex = Math.floor(Math.random() * this.players.length);
    this.secondPlayerIndex = Math.floor(Math.random() * this.players.length);
    console.log('primo indice: ' + this.firstPlayerIndex, 'secondo indice: ' + this.secondPlayerIndex);
    this.indexCheckEquals();
    while (this.firstPlayer === null || this.firstPlayer.isEliminated || this.countBattle < this.firstPlayer.countBattle) {
      this.players.forEach((element, index) => {
        if (index === this.firstPlayerIndex && (!element.player.isEliminated && this.countBattle >= element.player.countBattle)) {
          console.log('primo giocatore trovato: ' + element.text);
          element.player.isSelected = true;
          element.bord = this.redBorder;
          this.firstPlayer = element.player;
        } else if (index === this.firstPlayerIndex && (element.player.isEliminated || this.countBattle < element.player.countBattle)) {
          this.firstPlayerIndex = Math.floor(Math.random() * this.players.length);
          this.indexCheckEquals();
        }
      });
    }
    while (this.secondPlayer === null || this.secondPlayer.isEliminated || this.countBattle < this.secondPlayer.countBattle) {
      this.players.forEach((element, index) => {
        if (index === this.secondPlayerIndex && (!element.player.isEliminated && this.countBattle >= element.player.countBattle)) {
          console.log('secondo giocatore trovato: ' + element.text);
          element.player.isSelected = true;
          element.bord = this.blueBorder;
          this.secondPlayer = element.player;
        } else if (index === this.secondPlayerIndex && (element.player.isEliminated || this.countBattle < element.player.countBattle)) {
          this.secondPlayerIndex = Math.floor(Math.random() * this.players.length);
          this.indexCheckEquals();
        }
      });
    }
  }

  nextBattle() {
    let eliminatedPlayerCount = 0;
    this.players.forEach(element => {
      if (element.player.isEliminated) {
        eliminatedPlayerCount += 1;
      }
    });
    if (eliminatedPlayerCount === this.players.length / 2) {
      this.countBattle += 1;
    }
  }

  searchingTarget(callBack: Function) {
    this.interval -= 20;
    let self = this;
    let indexRandom = Math.floor(Math.random() * this.players.length);
    let indexRandom2 = Math.floor(Math.random() * this.players.length);
    let gridItemPlayer1 = this.players[indexRandom];
    gridItemPlayer1.bord = (gridItemPlayer1.player.countBattle > this.countBattle || gridItemPlayer1.player.isEliminated) ? gridItemPlayer1.bord : this.redBorder;
    let gridItemPlayer2 = this.players[indexRandom2];
    gridItemPlayer2.bord = (gridItemPlayer2.player.countBattle > this.countBattle || gridItemPlayer2.player.isEliminated) ? gridItemPlayer2.bord : this.blueBorder;
    if (this.interval <= -1000) {
      gridItemPlayer1.bord = (gridItemPlayer1.player.countBattle > this.countBattle || gridItemPlayer1.player.isEliminated) ? gridItemPlayer1.bord : this.defaultBorder;
      gridItemPlayer2.bord = (gridItemPlayer2.player.countBattle > this.countBattle || gridItemPlayer2.player.isEliminated) ? gridItemPlayer2.bord : this.defaultBorder;
      this.interval = 500;
      callBack();
      return;
    }
    setTimeout(function () {
      gridItemPlayer1.bord = (gridItemPlayer1.player.countBattle > self.countBattle || gridItemPlayer1.player.isEliminated) ? gridItemPlayer1.bord : self.defaultBorder;
      gridItemPlayer2.bord = (gridItemPlayer2.player.countBattle > self.countBattle || gridItemPlayer2.player.isEliminated) ? gridItemPlayer2.bord : self.defaultBorder;
      self.searchingTarget(callBack);
    }, this.interval);
  }

  gridInitialize() {
    let self = this;
    this.genericService.getData().subscribe((result) => {
      if (result) {
        result.forEach(element => {
          let gridItem = new GridItem();
          element.countBattle = 0;
          gridItem.player = element;
          gridItem.cols = '1';
          gridItem.rows = '1';
          gridItem.border = '10px';
          gridItem.repeat = 'no-repeat';
          gridItem.image = element.img;
          gridItem.size = 'cover';
          gridItem.boxShadow = '2px' + ' 2px';
          gridItem.text = element.name;
          gridItem.id = element.id;
          gridItem.bord = this.defaultBorder;
          self.players.push(gridItem);
        });
      }
    });
  }

  indexCheckEquals() {
    if (this.secondPlayerIndex === this.firstPlayerIndex) {
      while (this.secondPlayerIndex === this.firstPlayerIndex) {
        this.secondPlayerIndex = Math.floor(Math.random() * this.players.length);
      }
    }
  }

  setWinner(event: Player) {
    this.firstPlayer = null;
    this.secondPlayer = null;
    this.players.forEach(element => {
      if (element.player.id === event.id) {
        element.player.isSelected = false;
        element.bord = this.greenBorder;
        if (element.player.isEliminated) {
          element.image = './assets/foto/X.png';
          element.bord = this.redBorder;
        }
      }
    });
  }
}





