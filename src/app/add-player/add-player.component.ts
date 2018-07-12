import { Component, OnInit, Input } from '@angular/core';
import { GridItem } from '../model/gridItem';
import { Player, PlayerImpl } from '../model/player';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.css']
})
export class AddPlayerComponent implements OnInit {

@Input()
players;

img: string;
name: string;
player = new PlayerImpl();
gridPlayer: GridItem = new GridItem();


  constructor() { }

  ngOnInit() {
  }


  addPlayer() {
    console.log(this.img);

    let urlImg = this.img.split('\\');
    let urlName = urlImg[urlImg.length - 1];
    this.name = urlName.slice(0, -4);

    console.log(this.name);

    this.player.id = this.players.length;
    this.player.name = this.name;
    this.player.img = './assets/foto/freestyler/' + urlName;
    console.log(this.player.img);

    this.player.countBattle = 0;
    this.player.isEliminated = false;
    this.player.isSelected = false;
    this.player.permanentEliminated = false,
    this.player.isBomber = false;


    this.gridPlayer.player = this.player;
    this.gridPlayer.border = '10px';
    this.gridPlayer.repeat = 'no-repeat';
    this.gridPlayer.image = this.player.img;
    this.gridPlayer.secImg = null;
    this.gridPlayer.size = 'cover';
    this.gridPlayer.boxShadow = '2px' + ' 2px';
    this.gridPlayer.text = this.player.name;
    this.gridPlayer.id = this.player.id;
    this.gridPlayer.bord = '3px' + ' solid ' + '#000000';

    this.players.push(this.gridPlayer);
  }

}
