import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {

  constructor(private firestore: AngularFirestore) { }
  CrearHistorial(data: any): any {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection('Compras')
        .doc(data.id)
        .set({ Historial: [{}] },
          { merge: true })
        .then(res => { console.log(res); }, err => reject(err));
    });
  }

  ActualizarHistorial(data: any, tarjeta: any): any {
    console.log(tarjeta);
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection('Historial')
        .doc(data)
        .set({ Historial: tarjeta },
          { merge: true })
        .then(res => { console.log(res); console.log(tarjeta); }, err => reject(err));
    });
  }
}
