import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Player } from '../../model/player';
import { HostListener } from '@angular/core';
@Component({
    selector: 'app-single-battle-field-view',
    templateUrl: './singleBattleViewComponent.html',
    styleUrls: ['./singleBattleViewComponent.scss']
})
export class SingleBattleComponent implements OnInit {
    @Input()
    firstPlayer: Player;
    @Input()
    isFinal: boolean;
    @Input()
    singlePlayerMatch: boolean;
    @Output()
    firstPlayerOutput = new EventEmitter<Player>();
    @Output()
    closeView = new EventEmitter<boolean>();
    @HostListener('document:keypress', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        console.log(event.key);
        if (event.key === '1') {
            this.firstPlayer.isEliminated = false;
            this.firstPlayer.isSelected = true;
            this.chooseWinner();
        }
    }

    constructor() {
    }

    ngOnInit(): void {
        console.log(this.isFinal);
    }

    chooseWinner() {
        this.firstPlayerOutput.emit(this.firstPlayer);
        this.closeView.emit(false);
    }
}


