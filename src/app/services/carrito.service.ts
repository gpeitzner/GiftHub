import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Card3 } from '../interfaces/card';
@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  constructor(private firestore: AngularFirestore) { }
  CrearCarrito(email: any, data: any): any {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection('Usuario/' + email + '/Carrito')
        .add(data)
        .then(res => { resolve(res); }, err => reject(err));
    });
  }

  getCarrito(email: any): any {
    return this.firestore
      .collection('Usuario/' + email + '/Carrito')
      .valueChanges({ idField: 'customIdName' });

  }

  UpdateTarjeta(email: any, id: any, data: any): any {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection('Usuario/' + email + '/Carrito')
        .doc(id)
        .update(data)
        .then(res => { resolve(res); }, err => reject(err));
    });
  }

  DeleteTarjeta(email: any, id: any): any {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection('Usuario/' + email + '/Carrito')
        .doc(id)
        .delete()
        .then(res => { resolve(res); }, err => reject(err));
    });
  }

}
