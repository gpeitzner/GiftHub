import { Component, OnInit } from '@angular/core';
import { CardsService } from 'src/app/services/cards.service';
import { Card } from '../../interfaces/card';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  tarjetas: Card[] = [];

  constructor( private cardsService: CardsService ) { }

  ngOnInit(): void {
    this.cardsService.getCards()
    .subscribe((result) => {
      this.tarjetas = result;
      console.log(this.tarjetas[0].id);
    }, () => {}
    );
  }

  comprar(tarjeta: any): void{
    console.log(`se esta comprando: ${tarjeta.name} la cantidad: 1`);
  }

}
