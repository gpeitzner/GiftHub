import { Component, OnInit } from '@angular/core';
import {giftcards} from '../../mocks/giftcards';
import {users} from '../../mocks/users';
import { UsuarioI } from 'src/app/interfaces/usuario.model';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-giftcards',
  templateUrl: './giftcards.component.html',
  styleUrls: ['./giftcards.component.css']
})
export class GiftcardsComponent implements OnInit {
  public datos: any;
  public usuarios: any;
  public usuariosprueba: any;
  public tj: any = null;
  public user =  '';
  public id = '';
  constructor(private cardservice: CardService) { }
  public dialogo = document.getElementById('dialogo');
  ngOnInit(): void {
  this.cardservice.getusuarios().subscribe(
      (usuarios: any[]) => {
          this.usuarios = usuarios;
          console.log(this.usuarios);
      }
    );
  this.usuariosprueba = this.cardservice.getnuevosusuario();
  setTimeout(() => {
  for (const u of this.usuariosprueba){
    if (u.username === localStorage.getItem('username')){
      this.id = u.id;
    }
  }
  this.datos = this.cardservice.gettarjetasnuevo(this.id);
   }, 1000);
  console.log(this.usuariosprueba);
  this.cardservice.gettarjetas('mindi.ajpop@gmail.com').subscribe(
    (tarjetas: any) => {
      if (tarjetas.length > 0){
        console.log('Tarjetas del servicio');
        console.log(tarjetas);
      }
    }
  );
  }
    boton(tarjeta: string): void {
      console.log('A regalar tarjeta con el id: ' + tarjeta);
      for (const u of this.datos){
        if (u.id === tarjeta){
          this.tj = u;
        }
      }
    }
    regalar(): void {
      console.log('A regalar la tarjeta: ' + this.tj.id + ' al usuario: ' + this.user);
      this.cardservice.regalartarjeta(this.user , this.tj);
      this.cardservice.eliminartarjeta(this.id , this.tj);
    }
    registrarusuario(u): void {
      this.user = u;
    }
}
