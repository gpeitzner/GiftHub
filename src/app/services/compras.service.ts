import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {

  constructor(private firestore: AngularFirestore) { }
  CrearHistorial(email: any, data: any): any {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection('Usuario/' + email + '/Historial')
        .add(data)
        .then(res => { resolve(res); }, err => reject(err));
    });
  }

  getCarrito(email: any): any {
    return this.firestore.collection('Usuario/' + email + '/Historial').snapshotChanges();
  }
}
