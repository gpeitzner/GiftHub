import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TipoCambioService {

  constructor(private http: HttpClient) { }

  getTipoCambio(): any {
    return this.http.get('https://my-json-server.typicode.com/CoffeePaw/AyD1API/TasaCambio');
  }
}
