import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Card } from '../interfaces/card';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor( private http: HttpClient ) { }

  getCards(): Observable<Card[]>{
    return this.http.get<Card[]>('https://my-json-server.typicode.com/Coffeepaw/AyD1API/Card');
  }

}
