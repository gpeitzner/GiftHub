import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  constructor(private firestore: AngularFirestore) { }
  CrearCarrito(data: any): any {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection('Carrito')
        .doc(data.id)
        .set({ Carrito: [{}] },
          { merge: true })
        .then(res => { console.log(res); }, err => reject(err));
    });
  }

  ActualizarCarrito(data: any, tarjeta: any): any {
    console.log(tarjeta);
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection('Carrito')
        .doc(data)
        .set({ Carrito: tarjeta },
          { merge: true })
        .then(res => { console.log(res); console.log(tarjeta); }, err => reject(err));
    });
  }
}
