import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { GridItem } from '../model/gridItem';
import { element } from '../../../node_modules/protractor';

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

  menuItem: any[] = [
    { id: 1, isChecked: false, name: 'OTTAVI' },
    { id: 2, isChecked: false, name: 'QUARTI' },
    { id: 3, isChecked: false, name: 'SEMIFINALE' },
    { id: 4, isChecked: false, name: 'FINALE' }
  ];
  gridPlayers: GridItem[];
  playerSelected: GridItem;
  playersSelected: GridItem[] = [];

  winnerPlayers: GridItem[];



  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    console.log(event.key);
    if (event.key === 'w') {
      console.log(this.winnerPlayers);
      if (this.winnerPlayers.length === 16) {
        this.winnerPlayerOutput.emit(this.winnerPlayers);
      } else { console.log('Numero vincitori diverso di 16'); }
    }
  }


  constructor() { }

  ngOnInit() {
    this.gridPlayers = this.players;
  }

  getRangePlayer(): number {
    let outPut = 0;
    this.menuItem.forEach((element) => {
      switch (element.id) {
        case 1:
          outPut = 16;
          break;
        case 2:
          outPut = 8;
          break;
        case 3:
          outPut = 4;
          break;
        case 4:
          outPut = 2;
          break;
      }
    });
    return outPut;
  }

  onChangeRadioButton(item) {
    console.log(item);
    this.playerSelected = null;
    this.playersSelected = [];
    if (item.isChecked) {
      this.menuItem.forEach((element) => {
        if (item.id !== element.id) {
          element.isChecked = false;
        }
      });
    }
  }

  onChange(gridPlayer: GridItem) {
    if (gridPlayer.isChecked) {
      if (this.playersSelected.length < 8) {
        gridPlayer.player.isBomber = true;
      } else {
        gridPlayer.player.isBomber = false;
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
