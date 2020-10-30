import { Injectable } from '@angular/core';
import { history } from '../mocks/history';

export interface IHistory {
  date: string;
  description: string;
  total: number;
}

@Injectable({
  providedIn: 'root'
})

export class HistoryService {

  constructor() { }

  getHistory(user: string): Promise<IHistory[]>{

    return new Promise<IHistory[]>((resolve) => {
      resolve(
        history
      );
    });
  }
}
