import { Component, OnInit } from '@angular/core';
import {giftcards} from '../../mocks/giftcards';

@Component({
  selector: 'app-giftcards',
  templateUrl: './giftcards.component.html',
  styleUrls: ['./giftcards.component.css']
})
export class GiftcardsComponent implements OnInit {
  public datos: any;
  constructor(
  ) { }

  ngOnInit(): void {
    this.datos = giftcards;
   // console.log(giftcards);
  }

}
