import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CardsComponent } from './cards.component';
import { cards, precios } from '../../mocks/cards';
import { Card2 } from '../../interfaces/card';
import { Card } from 'src/app/interfaces/card';
import { CardService } from 'src/app/services/card.service';
import { Observable, of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { Precio } from '../../interfaces/Precio';
import { AngularFirestore } from '@angular/fire/firestore';

describe('CardsComponent', () => {
  let component: CardsComponent;
  let fixture: ComponentFixture<CardsComponent>;
  const mockCards = cards;
  const AngularFirestoreStub = {
    collection: (someString) => {
      return [];
    },
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ CardsComponent ]
      , // Here we swap the mocked version:
      providers: [{provide: CardService, useClass: CardsServiceMock}, { provide: AngularFirestore, useValue: AngularFirestoreStub }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should exist data', () => {
    component.tarjetas = mockCards;
    expect(component.tarjetas.length).toBeGreaterThan(0);
  });

  it('should have a title', () => {
    const title = fixture.debugElement.query(By.css('h1')).nativeElement;
    expect(title.innerHTML).toBe('Catálogo');
  });

  it('should have a navbar', () => {
    const navbar = fixture.debugElement.query(By.css('.navbar')).nativeElement;
    expect(navbar.innerHTML).not.toBeNull();
  });

  it('should have a cards', () => {
    fixture.detectChanges();
    expect(component.tarjetas.length).toBeGreaterThan(0);
  });

  it('should have a cards container', () => {
    fixture.detectChanges();
    const cardContainer = fixture.debugElement.nativeElement.querySelector('#cardContainer');
    expect(cardContainer.innerHTML).not.toBeNull();
  });

  it('should have the same number of cards list in cards containter', () => {
    fixture.detectChanges();
    const listOfCardsInContainer = fixture.debugElement.queryAll(By.css('.card-body'));
    expect(listOfCardsInContainer.length).toEqual(7);
  });

});

class CardsServiceMock {
  public getCards(): Observable<Card[]> {
    return of(cards);
  }
  public getValue(): Observable<Precio[]> {
    return of(precios);
  }
}
