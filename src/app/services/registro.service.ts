import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  constructor(private firestore: AngularFirestore) { }
  form = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    nombre: new FormControl(''),
    apellido: new FormControl(''),
    correo: new FormControl(''),
    dpi: new FormControl(''),
    edad: new FormControl('')
  });

  createUser(data: any): any {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection('Usuario')
        .doc(data.correo)
        .set(data)
        .then(res => { console.log(res); }, err => reject(err));
    });
  }

  getUser(): any {
    return this.firestore.collection('Usuario').snapshotChanges();
  }

  updateUser(data: any, id: any): any {
    return this.firestore
      .collection('Usuario')
      .doc(id)
      .set({  username: data.username, password: data.password, nombre: data.nombre,
            apellido: data.apellido, correo: data.correo, dpi: data.dpi, edad: data.edad }, { merge: true });
  }

}
