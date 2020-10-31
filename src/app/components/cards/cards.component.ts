import { Component, OnInit } from '@angular/core';
import { CardService } from 'src/app/services/card.service';
import { Card } from '../../interfaces/card';
import { Precio } from '../../interfaces/Precio';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  tarjetas: Card[] = [];
  precios = new Map<string, number>();

  constructor( private cardsService: CardService ) { }

  ngOnInit(): void {
    this.cargarTarjetas();
  }

  cargarTarjetas(): void{
    let ta: Card[] = [];

    this.cardsService.getCards()
    .subscribe((result) => {
      this.tarjetas = result;
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0 ; i < this.tarjetas.length; i++){
        if (this.tarjetas[i].active === true){
          ta.push(this.tarjetas[i]);
        }
      }
      this.tarjetas = ta;

      this.cardsService.getValue()
      .subscribe((result2) => {
        let pt: Precio[] = [];
        pt = result2;
        // tslint:disable-next-line: prefer-for-of
        for (let t = 0 ; t < this.tarjetas.length; t++){
          // tslint:disable-next-line: prefer-for-of
          for (let p = 0 ; p < pt.length; p++){
            if (this.tarjetas[t].id === pt[p].id){
              this.precios.set(this.tarjetas[t].id, pt[p].total);
            }
          }
        }
        ta = [];
        // tslint:disable-next-line: prefer-for-of
        for (let t = 0 ; t < this.tarjetas.length; t++){
            if (this.precios.get(this.tarjetas[t].id) === undefined){
            }else{
              ta.push(this.tarjetas[t]);
            }
        }
        this.tarjetas = ta;

      }, () => {}
      );

    }, () => {}
    );

  }

  comprar(tarjeta: any): void{
    console.log(`se esta comprando: ${tarjeta.name} la cantidad: 1`);
  }

}
