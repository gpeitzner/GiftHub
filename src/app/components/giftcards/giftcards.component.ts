import { Component, OnInit } from '@angular/core';
import {giftcards} from '../../mocks/giftcards';
import {users} from '../../mocks/users';

@Component({
  selector: 'app-giftcards',
  templateUrl: './giftcards.component.html',
  styleUrls: ['./giftcards.component.css']
})
export class GiftcardsComponent implements OnInit {
  public datos: any;
  public usuarios: any;
  public tj = -1;
  public user =  '';
  constructor(
  ) { }
  public dialogo = document.getElementById('dialogo');
  ngOnInit(): void {
    this.datos = giftcards;
    this.usuarios = users;
    console.log(giftcards);
  }

    boton(tarjeta): void {
      console.log('A regalar tarjeta con el id: ' + tarjeta);
      this.tj = tarjeta;
    }

    regalar(): void {
      console.log('A regalar la tarjeta: ' + this.tj + ' al usuario: ' + this.user);
    }
    registrarusuario(u): void {
      this.user = u;
    }
}
