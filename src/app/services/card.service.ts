import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Card } from '../interfaces/card';
import { Precio } from '../interfaces/Precio';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor( private http: HttpClient ) { }

  getCards(): Observable<Card[]>{
    return this.http.get<Card[]>('https://my-json-server.typicode.com/Coffeepaw/AyD1API/Card');
  }

  getValue(): Observable<Precio[]>{
    return this.http.get<Precio[]>('https://my-json-server.typicode.com/Coffeepaw/AyD1API/Value');
  }

}
