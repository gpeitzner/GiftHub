import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Card } from '../interfaces/card';
// import { UsuarioI } from '../interfaces/usuario.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor( private http: HttpClient , private firestore: AngularFirestore) { }

  getCards(): Observable<Card[]>{
    return this.http.get<Card[]>('https://my-json-server.typicode.com/Coffeepaw/AyD1API/Card');
  }
  getusuarios(): Observable<any> {
    return this.firestore
      .collection('Usuario', (ref) =>
        ref.where('correo', '!=', '')
      )
      .valueChanges();
  }
}
