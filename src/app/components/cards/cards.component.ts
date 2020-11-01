import { Component, OnInit } from '@angular/core';
import { CardService } from 'src/app/services/card.service';
import { Card, Card2, Card3 } from '../../interfaces/card';
import { Precio } from '../../interfaces/Precio';
import { CarritoService } from 'src/app/services/carrito.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  tar: Card2[] = [];
  tarjetas: Card[] = [];
  precios = new Map<string, number>();
  data = [];

  constructor(private cardsService: CardService, private carritoS: CarritoService, private userS: UserService, private router: Router) { }

  ngOnInit(): void {
    this.cargarTarjetas();
  }

  cargarTarjetas(): void {

    this.cardsService.getCards()
      .subscribe((result) => {
        this.tarjetas = result;
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < this.tarjetas.length; i++) {
          if (this.tarjetas[i].active === true) {
            const c: Card2 = {
              id: this.tarjetas[i].id,
              name: this.tarjetas[i].name,
              image: this.tarjetas[i].image,
              chargeRate: this.tarjetas[i].chargeRate,
              availability: this.tarjetas[i].availability,
              Precio: 0,
              Cantidad: 0,
            };
            this.tar.push(c);
          }
        }
        const ta: Card2[] = [];
        // console.log(JSON.stringify(this.tar));
        this.cardsService.getValue()
          .subscribe((result2) => {
            let pt: Precio[] = [];
            pt = result2;
            // tslint:disable-next-line: prefer-for-of
            for (let t = 0; t < this.tar.length; t++) {
              // tslint:disable-next-line: prefer-for-of
              for (let p = 0; p < pt.length; p++) {
                for (const val of this.tar[t].availability) {
                  if (val === parseInt(pt[p].id, 10)) {
                    const c: Card2 = {
                      id: this.tar[t].id,
                      name: this.tar[t].name,
                      image: this.tar[t].image,
                      chargeRate: this.tar[t].chargeRate,
                      availability: this.tar[t].availability,
                      Precio: pt[p].total,
                      Cantidad: 0,
                    };
                    ta.push(c);
                  }
                }
              }
            }
            this.tar = ta;
            // console.log(JSON.stringify(ta));
          }, () => { }
          );



      }, () => { }
      );

  }

  Agregar(tarjeta: any): void {
    console.log(`se esta comprando: ` + JSON.stringify(tarjeta));
    console.log(`se esta comprando: ${tarjeta.name} la cantidad: 1`);
    console.log((this.userS.user.correo));
    const obj = {
      nombre: tarjeta.name,
      cantidad: tarjeta.Cantidad,
      precio: parseFloat(tarjeta.Precio),
      total: parseFloat(tarjeta.Cantidad) * parseFloat(tarjeta.Precio),
      imagen: tarjeta.image,
      chargeRate: tarjeta.chargeRate
    };

    this.carritoS.CrearCarrito(this.userS.user.correo, obj).then(res => {
      console.log(res);
    });

  }

  abrirCarrito(): void {
    this.router.navigateByUrl('/Carrito');
  }
}
