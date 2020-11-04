import { Injectable } from '@angular/core';
import { history } from '../mocks/history';
import { UserService } from './user.service';
import { AngularFirestore } from '@angular/fire/firestore';

export interface IHistory {
  date: string;
  description: string;
  total: number;
}

@Injectable({
  providedIn: 'root'
})

export class HistoryService {

  constructor(private firestore: AngularFirestore, private userService: UserService) {}

  getHistory(): Promise<IHistory[]>{
    const user = this.userService.user;
    return new Promise<IHistory[]>((resolve, reject) => {
      if (user) {
      const result = this.firestore.doc(`Usuario/${user.customIdName}`);

      result.collection('Historial').valueChanges().subscribe( res => {
        const data: IHistory[] = res.map( value => ({
          date: value.Fecha,
          description: value.Descripcion,
          total: value.total
        }));
        resolve(data);
      });
    }
      resolve([]);
    });
  }
}
