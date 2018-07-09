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
  matchingPlayer = false;
  firstPlayer: Player = null;
  secondPlayer: Player = null;
  interval = 0;
  isAble = true;
  countBattle = 1;
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
    let range = this.players.length;
    let firstPlayerIndex = Math.floor(Math.random() * range);
    let secondPlayerIndex = Math.floor(Math.random() * range);
    while (firstPlayerIndex === secondPlayerIndex) {
      secondPlayerIndex = Math.floor(Math.random() * range);
    }
    console.log('primo indice: ' + firstPlayerIndex, 'secondo indice: ' + secondPlayerIndex);
    while (this.firstPlayer === null || this.firstPlayer.isEliminated || this.firstPlayer.isSelected) {
      this.players.forEach((element, index) => {
        if (index === firstPlayerIndex && (!element.player.isEliminated && !element.player.isSelected)) {
          console.log('primo giocatore trovato: ' + element.text);
          element.bord = this.redBorder;
          this.firstPlayer = element.player;
        } else if (index === firstPlayerIndex && (element.player.isEliminated || element.player.isSelected)) {
          do { firstPlayerIndex = Math.floor(Math.random() * range); }
          while (firstPlayerIndex === secondPlayerIndex);
        }
      });
    }
    while (this.secondPlayer === null || this.secondPlayer.isEliminated || this.secondPlayer.isSelected) {
      this.players.forEach((element, index) => {
        if (index === secondPlayerIndex && (!element.player.isEliminated && !element.player.isSelected)) {
          console.log('secondo giocatore trovato: ' + element.text);
          element.bord = this.blueBorder;
          this.secondPlayer = element.player;
        } else if (index === secondPlayerIndex && (element.player.isEliminated || element.player.isSelected)) {
          do { secondPlayerIndex = Math.floor(Math.random() * range); }
          while (secondPlayerIndex === firstPlayerIndex);
        }
      });
    }
  }

  nextBattle() {
    let eliminatedPlayerCount = 0;
    let winnerPlayerCount = 0;
    let range = this.players.length;
    let twoPow = Math.pow(2, this.countBattle);
    this.players.forEach(element => {
      if (element.player.isEliminated) {
        eliminatedPlayerCount += 1;
      } else if (element.player.isSelected) {
         winnerPlayerCount += 1;
      }
    });
    if ((range / twoPow) === eliminatedPlayerCount && (range / twoPow) === winnerPlayerCount) {
        this.countBattle += 1;
        console.log('Secondo round sta per iniziare... ');
        this.players.forEach(element => {
          if (element.player.isSelected) {
            element.player.isSelected = false;
            element.bord = this.defaultBorder;
          }
        });
    }
  }

  searchingTarget(callBack: Function) {
    this.interval -= 20;
    let self = this;
    let indexRandom = Math.floor(Math.random() * this.players.length);
    let indexRandom2 = Math.floor(Math.random() * this.players.length);
    let gridItemPlayer1 = this.players[indexRandom];
    gridItemPlayer1.bord = (gridItemPlayer1.player.isSelected || gridItemPlayer1.player.isEliminated) ? gridItemPlayer1.bord : this.redBorder;
    let gridItemPlayer2 = this.players[indexRandom2];
    gridItemPlayer2.bord = (gridItemPlayer2.player.isSelected || gridItemPlayer2.player.isEliminated) ? gridItemPlayer2.bord : this.blueBorder;
    if (this.interval <= -1000) {
      gridItemPlayer1.bord = (gridItemPlayer1.player.isSelected || gridItemPlayer1.player.isEliminated) ? gridItemPlayer1.bord : this.defaultBorder;
      gridItemPlayer2.bord = (gridItemPlayer2.player.isSelected || gridItemPlayer2.player.isEliminated) ? gridItemPlayer2.bord : this.defaultBorder;
      this.interval = 0;
      callBack();
      return;
    }
    setTimeout(function () {
      gridItemPlayer1.bord = (gridItemPlayer1.player.isSelected || gridItemPlayer1.player.isEliminated) ? gridItemPlayer1.bord : self.defaultBorder;
      gridItemPlayer2.bord = (gridItemPlayer2.player.isSelected || gridItemPlayer2.player.isEliminated) ? gridItemPlayer2.bord : self.defaultBorder;
      self.searchingTarget(callBack);
    }, this.interval);
  }

  gridInitialize() {
    let self = this;
    this.genericService.getData().subscribe((result) => {
      if (result) {
        result.forEach(element => {
          let gridItem = new GridItem();
          gridItem.player = element;
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

  setWinner(event: Player) {
    this.firstPlayer = null;
    this.secondPlayer = null;
    this.players.forEach(element => {
      if (element.player.id === event.id) {
        if (element.player.isSelected) {
          element.bord = this.greenBorder;
        } else if (element.player.isEliminated) {
          element.image = './assets/foto/X.png';
          element.bord = this.redBorder;
        }
      }
    });
  }
}





