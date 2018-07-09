import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Player } from '../model/player';
import { HostListener } from '@angular/core';
@Component({
    selector: 'app-battle-field-view',
    templateUrl: './battleFieldView.html',
    styleUrls: ['./battleFieldView.scss']
})
export class BattleFieldComponent implements OnInit {
    @Input()
    firstPlayer: Player;
    @Input()
    secondPlayer: Player;
    @Input()
    matchingPlayer: boolean;
    @Output()
    firstPlayerOutput = new EventEmitter<Player>();
    @Output()
    sedondPlayerOutPut = new EventEmitter<Player>();
    @Output()
    closeView = new EventEmitter<boolean>();
    @HostListener('document:keypress', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        console.log(event.key);
        if (event.key === '1') {
            this.firstPlayer.isEliminated = false;
            this.firstPlayer.isSelected = true;
            this.secondPlayer.isEliminated = true;
            this.secondPlayer.isSelected = false;
            this.chooseWinner();
        } else if (event.key === '2') {
            this.firstPlayer.isEliminated = true;
            this.firstPlayer.isSelected = false;
            this.secondPlayer.isEliminated = false;
            this.secondPlayer.isSelected = true;
            this.chooseWinner();
        }
    }

    constructor() {
    }

    ngOnInit(): void {
    }

    chooseWinner() {
        this.firstPlayerOutput.emit(this.firstPlayer);
        this.sedondPlayerOutPut.emit(this.secondPlayer);
        this.closeView.emit(false);
    }
}


