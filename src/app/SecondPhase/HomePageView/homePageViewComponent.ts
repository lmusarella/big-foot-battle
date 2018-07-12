import { Component, OnInit, Input, HostListener } from '@angular/core';
import { GridItem } from '../../model/gridItem';
import { Player } from '../../model/player';

@Component({
  selector: 'app-home-page-component',
  templateUrl: './homePageViewComponent.html',
  styleUrls: ['./homePageViewComponent.scss']
})
export class HomePageViewComponent implements OnInit {
  @Input()
  listTopPlayers: GridItem[];
  @Input()
  countBattle: number;

  isAbleChange = false;
  matchingPlayer = false;
  showMenu = false;
  firstPlayer: Player = null;
  secondPlayer: Player = null;
  oldFirstPlayer: Player = null;
  oldSecondPlayer: Player = null;
  interval = 0;
  isAble = true;
  isFinal = false;
  winnerPlayer: Player = null;
  singlePlayerMatch = false;
  isFirstLogin = true;
  textTransiction: string = null;
  transiction = false;
  players: GridItem[] = [];
  defaultBorder = '3px' + ' solid ' + '#000000';
  greenBorder = '3px' + ' solid ' + '#00FF00';
  redBorder = '3px' + ' solid ' + '#FF0000';
  blueBorder = '3px' + ' solid ' + '#0000FF';
  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
      console.log(event.key);
      if (event.key === 'm') {
          this.showMenu = !this.showMenu;
      }
  }
  constructor() {
  }
  ngOnInit() {
    console.log(this.countBattle);
    this.players = this.listTopPlayers;
    this.resetValuePlayer(this.players);
  }

  clickButton() {
    if (this.isFirstLogin && this.countBattle === 1) {
      this.isFirstLogin = false;
      this.textTransiction = 'INIZIO OTTAVI';
      this.showTransictionView(() => {
        this.transiction = false;
        this.showModal();
      });
    } else if (this.countBattle === 6) {
      this.textTransiction = 'VINCE LA BATTLE';
      this.showTransictionView(() => {
        this.players.forEach((element) => {
          if (!element.player.isEliminated) {
            this.winnerPlayer = element.player;
          }
        });
        this.transiction = false;
        this.isFinal = true;
        this.singlePlayerMatch = true;
      });
    } else if (this.countBattle === 5) {
      this.countBattle += 1;
      this.showModal();
    } else {
      this.showModal();
    }
  }
  showModal() {
    this.isAble = false;
    this.searchingTarget(() => {
      this.choosePlayer();
      setTimeout(() => {
        this.matchingPlayer = !this.matchingPlayer;
        this.isAbleChange = true;
        this.isAble = true;
      }, 1500);
    });
  }
  closeView(event) {
    this.matchingPlayer = event;
  }
  choosePlayer() {
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
          this.oldFirstPlayer = element.player;
        } else if (index === firstPlayerIndex && (element.player.isEliminated || element.player.isSelected)) {
          do { firstPlayerIndex = Math.floor(Math.random() * range); }
          while (firstPlayerIndex === secondPlayerIndex);
        }
      });
    }
    while (this.secondPlayer === null || this.secondPlayer.isEliminated || this.secondPlayer.isSelected || ((this.firstPlayer.isBomber === this.secondPlayer.isBomber) && this.countBattle === 1)) {
      this.players.forEach((element, index) => {
        if (index === secondPlayerIndex && (!element.player.isEliminated && !element.player.isSelected)) {
          if (element.player.isBomber === this.firstPlayer.isBomber && this.countBattle === 1) {
            do { secondPlayerIndex = Math.floor(Math.random() * range); }
            while (secondPlayerIndex === firstPlayerIndex);
          } else  {
          console.log('secondo giocatore trovato: ' + element.text);
          element.bord = this.blueBorder;
          this.secondPlayer = element.player;
          this.oldSecondPlayer = element.player;
          }
        } else if (index === secondPlayerIndex && (element.player.isEliminated || element.player.isSelected || ((element.player.isBomber === this.firstPlayer.isBomber && this.countBattle === 1)))) {
          do { secondPlayerIndex = Math.floor(Math.random() * range); }
          while (secondPlayerIndex === firstPlayerIndex);
        }
      });
    }
  }

  nextBattle() {
    let deltaEliminated = 0;
    let eliminatedPlayerCount = 0;
    let winnerPlayerCount = 0;
    let range = this.players.length;
    let twoPow = Math.pow(2, this.countBattle);
    this.players.forEach(element => {
      if (element.player.isEliminated) {
        if (element.player.permanentEliminated && this.countBattle > 1) {
          deltaEliminated += 1;
        }
        eliminatedPlayerCount += 1;
      } else if (element.player.isSelected) {
        winnerPlayerCount += 1;
      }
    });
    if ((range / twoPow) === (eliminatedPlayerCount - deltaEliminated) && (range / twoPow) === winnerPlayerCount) {
      this.isAbleChange = false;
      this.countBattle += 1;
      console.log('Secondo round sta per iniziare... ');
      let textTransiction = null;
      switch (this.countBattle) {
          case 2:
          textTransiction = 'INIZIO QUARTI';
          break;
          case 3:
          textTransiction = 'SEMIFINALE';
          break;
          case 4:
          textTransiction = 'FINALE';
           break;
      }
      if (this.countBattle === 4) {
        this.countBattle += 1;
      }
      this.textTransiction = textTransiction;
      this.showTransictionView(() => {
        this.transiction = false;
        this.players.forEach(element => {
          if (element.player.isSelected) {
            element.player.isSelected = false;
            element.bord = this.defaultBorder;
          } else if (element.player.isEliminated) {
            element.player.permanentEliminated = true;
          }
        });
      });
    }
  }

  searchingTarget(callBack: Function) {
    this.interval -= 20;
    let self = this;
    let indexRandom = Math.floor(Math.random() * this.listTopPlayers.length);
    let indexRandom2 = Math.floor(Math.random() * this.listTopPlayers.length);
    let gridItemPlayer1 = this.listTopPlayers[indexRandom];
    gridItemPlayer1.bord = (gridItemPlayer1.player.isSelected || gridItemPlayer1.player.isEliminated) ? gridItemPlayer1.bord : this.redBorder;
    let gridItemPlayer2 = this.listTopPlayers[indexRandom2];
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

  setWinner(event: Player) {
    this.firstPlayer = null;
    this.secondPlayer = null;
    this.listTopPlayers.forEach(element => {
      if (element.player.id === event.id) {
        if (element.player.isSelected) {
          element.bord = this.greenBorder;
        } else if (element.player.isEliminated) {
          element.secImg = './assets/foto/X.png';
          element.bord = this.redBorder;
        }
      }
    });
    this.nextBattle();
  }

  changeLastBattle() {
    if (this.oldFirstPlayer && this.oldSecondPlayer) {
      this.players.forEach((element) => {
        if (element.player.id === this.oldFirstPlayer.id || element.player.id === this.oldSecondPlayer.id) {
          if (element.player.isEliminated) {
            element.player.isEliminated = false;
            element.player.isSelected = true;
            element.secImg = null;
            element.bord = this.greenBorder;
          } else if (!element.player.isEliminated) {
            element.player.isEliminated = true;
            element.player.isSelected = false;
            element.secImg = './assets/foto/X.png';
            element.bord = this.redBorder;
          }
        }
      });
    }
  }

  resetValuePlayer(list: GridItem[]) {
    if (list !== null) {
      list.forEach(element => {
        element.bord = this.defaultBorder;
        element.isChecked = false;
        element.player.isSelected = false;
      });
    }
  }

  showTransictionView(callBack: Function) {
    this.transiction = true;
    this.textTransiction = this.textTransiction;
    setTimeout(() => {
      callBack();
     }, 5000);
  }

  closeTransictionView(event) {
    this.transiction = event;
  }

}





