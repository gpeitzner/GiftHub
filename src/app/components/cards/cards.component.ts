import { Component, OnInit } from '@angular/core';
import { CardService } from 'src/app/services/card.service';
import { Card } from '../../interfaces/card';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  tarjetas: Card[] = [];

  constructor( private cardsService: CardService ) { }

  ngOnInit(): void {
    this.cargarTarjetas();
  }

  cargarTarjetas(): void{
    this.cardsService.getCards()
    .subscribe((result) => {
      this.tarjetas = result;
    }, () => {}
    );
  }

  comprar(tarjeta: any): void{
    console.log(`se esta comprando: ${tarjeta.name} la cantidad: 1`);
  }

}