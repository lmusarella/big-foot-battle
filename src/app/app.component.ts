import { Component, OnInit } from '@angular/core';
import { GridItem } from './model/gridItem';
import { GenericService } from './service/genericService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  selection = true;
  listTopPlayers: GridItem[] = [];
  playersInput: GridItem[] = [];
  defaultBorder = '3px' + ' solid ' + '#000000';
  greenBorder = '3px' + ' solid ' + '#00FF00';
  redBorder = '3px' + ' solid ' + '#FF0000';
  blueBorder = '3px' + ' solid ' + '#0000FF';
  constructor(private genericService: GenericService) {
  }
  ngOnInit() {
    this.gridInitialize();
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
          gridItem.secImg = null;
          gridItem.size = 'cover';
          gridItem.boxShadow = '2px' + ' 2px';
          gridItem.text = element.name;
          gridItem.id = element.id;
          gridItem.bord = this.defaultBorder;
          self.playersInput.push(gridItem);
        });
      }
    });
  }

  closeSection (event) {
    this.selection = event;
  }

  setTopPlayersList(event) {
    this.listTopPlayers = event;
  }
}





