import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Card } from '../interfaces/card';
import { Usuario } from '../interfaces/usuarios';
// import { UsuarioI } from '../interfaces/usuario.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor( private http: HttpClient , private firestore: AngularFirestore) {}

  getCards(): Observable<Card[]>{
    return this.http.get<Card[]>('https://my-json-server.typicode.com/Coffeepaw/AyD1API/Card');
  }
  getusuarios(): Observable<any[]> {
    return this.firestore
      .collection('Usuario', (ref) =>
        ref.where('correo', '!=', '')
      ).valueChanges();
  }
  getnuevosusuario(): Usuario[]{
    const datos: Usuario[] = [];
    this.firestore.collection('Usuario').ref.onSnapshot(querys => {
      querys.docs.map(ref => {
        const actual = ref.data();
        const dato: Usuario = {
          id: ref.id,
          username: actual.username,
          password: actual.password,
          nombre: actual.nombre,
          edad: actual.edad,
          correo: actual.correo,
          dpi: actual.dpi,
          apellido: actual.apellido
        };
        datos.push(dato);
      });
    });
    return datos;
  }
  gettarjetas(usuario): Observable<any> {
    return this.firestore
      .collection('Usuario'
      ).doc(usuario).collection('Inventario'
      )
      .valueChanges();
  }
  gettarjetasnuevo(usuario): any[]{
    const datos: any[] = [];
    this.firestore.collection('Usuario').doc(usuario).collection('Inventario').ref.onSnapshot(querys => {
      querys.docs.map(ref => {
        const actual = ref.data();
        const dato = {
          id: ref.id,
          image: actual.image,
          name: actual.name,
          valor: actual.precio
        };
        datos.push(dato);
      });
    });
    return datos;
  }
  regalartarjeta(idpersona: string , tarjeta: any): void{
    this.firestore.collection('Usuario').doc(idpersona).collection('Inventario').doc(tarjeta.id).set({
      image: tarjeta.image,
      name: tarjeta.name,
      precio: tarjeta.valor
    });
  }
  eliminartarjeta(idpersona: string , tarjeta: any): void{
    this.firestore.collection('Usuario').doc(idpersona).collection('Inventario').doc(tarjeta.id).delete();
  }
}
