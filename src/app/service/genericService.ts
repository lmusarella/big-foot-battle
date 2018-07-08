import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Player } from '../model/player';
import { Observable } from 'rxjs';

@Injectable()
export class GenericService {

    private _url  = '../../assets/mock-data/player_data.json';
    constructor(private _http: HttpClient) {
    }

    public getData (): Observable<Player[]> {
        return this._http.get<Player[]>(this._url);
    }
}
