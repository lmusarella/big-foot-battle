import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-transiction-view',
    templateUrl: './transictionView.html',
    styleUrls: ['./transictionView.scss']
})
export class TransictionComponent implements OnInit {
    @Input()
    transiction: boolean;
    @Input()
    text: string;

    constructor() {
    }

    ngOnInit(): void {
    }

}


