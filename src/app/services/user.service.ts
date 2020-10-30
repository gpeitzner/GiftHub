import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UsuarioI } from '../interfaces/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private firestore: AngularFirestore) {}

  /**
   * Storage current user session data
   */
  user: UsuarioI;

  /**
   * Return an observable when the user tries to log with email and password
   * @param email User email
   * @param password User password
   */
  loginByEmail(email: string, password: string): Observable<any> {
    return this.firestore
      .collection('Usuario', (ref) =>
        ref.where('correo', '==', email).where('password', '==', password)
      )
      .valueChanges();
  }

  /**
   * Return an observable when the user tries to log with username and password
   * @param username User username
   * @param password User password
   */
  loginByUser(username: string, password: string): Observable<any> {
    return this.firestore
      .collection('Usuario', (ref) =>
        ref.where('username', '==', username).where('password', '==', password)
      )
      .valueChanges();
  }
}
