import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { GridItem } from '../model/gridItem';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Input()
  players: GridItem[];

  @Input()
  showMenu: boolean;

  @Output()
  winnerPlayerOutput = new EventEmitter<GridItem[]>();

  @Output()
  countBattle = new EventEmitter<number>();

  menuItem: any[] = [
    { id: 1, isChecked: false, name: 'OTTAVI' },
    { id: 2, isChecked: false, name: 'QUARTI' },
    { id: 3, isChecked: false, name: 'SEMIFINALE' },
    { id: 4, isChecked: false, name: 'FINALE' }
  ];
  defaultBorder = '3px' + ' solid ' + '#000000';
  gridPlayers: GridItem[];
  playerSelected: GridItem;
  playersSelected: GridItem[] = [];
  showPlayerList = false;
  winnerPlayers: GridItem[];
  rangePlayer = null;
  battleNumber = null;



  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    console.log(event.key);
    if (event.key === 'w') {
      console.log(this.winnerPlayers);
      if (this.winnerPlayers.length === this.rangePlayer) {
        this.countBattle.emit(this.battleNumber);
        if (this.battleNumber > 1) {
            this.players.forEach((element) => {
              if (!element.player.playerChoose && this.winnerPlayers.length < 16) {
                element.player.isEliminated = true;
                element.player.isSelected = true;
                element.player.permanentEliminated = true;
                element.secImg = './assets/foto/X.png';
                this.winnerPlayers.push(element);
              }
            });
      }
        this.winnerPlayerOutput.emit(this.winnerPlayers);
      } else { console.log('Numero vincitori diverso di 16'); }
    }
  }


  constructor() { }

  ngOnInit() {
    this.gridPlayers = this.players;
  }

  getRangePlayer() {
    this.menuItem.forEach((element) => {
      if (element.isChecked) {
      switch (element.id) {
        case 1:
          this.battleNumber = 1;
          this.rangePlayer = 16;
          break;
        case 2:
        this.battleNumber = 2;
        this.rangePlayer = 8;
          break;
        case 3:
        this.battleNumber = 3;
        this.rangePlayer = 4;
          break;
        case 4:
        this.battleNumber = 4;
        this.rangePlayer = 2;
          break;
      }
    }
    });
  }

  resetCheckPlayer() {
    this.gridPlayers.forEach((element) => {
      if (element.isChecked) {
        element.isChecked = false;
      }
    });
  }

  onChangeRadioButton(item) {
    console.log(item);
    this.getRangePlayer();
    this.resetCheckPlayer();
    this.playerSelected = null;
    this.playersSelected = [];
    this.showPlayerList = true;
    if (item.isChecked) {
      this.menuItem.forEach((element) => {
        if (item.id !== element.id) {
          element.isChecked = false;
        }
      });
    } else {
      this.showPlayerList = false;
    }
  }

  onChange(gridPlayer: GridItem) {
    if (gridPlayer.isChecked) {
      if (this.playersSelected.length < 8 && this.battleNumber === 1) {
        gridPlayer.player.isBomber = true;
        gridPlayer.player.playerChoose = true;
      } else {
        gridPlayer.player.isBomber = false;
        gridPlayer.player.playerChoose = true;
      }
      this.playersSelected.push(gridPlayer);
    } else {
      if (this.playersSelected.length > 0) {
        this.playersSelected.forEach((element, index, array) => {
          if (element.player.name === gridPlayer.player.name) {
            array.splice(index, 1);
          }
        });
      }
    }
    this.winnerPlayers = this.playersSelected;
  }
}
