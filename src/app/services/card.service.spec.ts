import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CardService } from './card.service';
import { cards } from '../mocks/cards';
import { AngularFirestore } from '@angular/fire/firestore';
import { of, Observable } from 'rxjs';

describe('CardService', async () => {
  let httpMock: HttpTestingController;
  let service: CardService;
  const dummyCardListResponse = cards;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CardService, AngularFirestore],
    });
    const input: any[] = [
      { apellido: 'carias', correo: 'prueba@gmail.com', dpi: '30018995910101', edad: '22', nombre: 'carlos', password: 'pass123', username: 'prueba' },
    ];
    const data = of(input);
    const collectionStub = {
      valueChanges: jasmine.createSpy('valueChanges').and.returnValue(data),
    };
    const angularFirestoreStub = {
      collection: jasmine
        .createSpy('collection')
        .and.returnValue(collectionStub),
    };
    TestBed.overrideProvider(AngularFirestore, {
      useValue: angularFirestoreStub,
    });
    service = TestBed.inject(CardService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getCards() should return data', () => {
    service.getCards().subscribe((res) => {
      expect(res).toEqual(dummyCardListResponse);
    });

    const req = httpMock.expectOne('https://my-json-server.typicode.com/Coffeepaw/AyD1API/Card');
    expect(req.request.method).toBe('GET');
    req.flush(dummyCardListResponse);
  });

  it('getCards() should return number of cards greater than 0', () => {
    service.getCards().subscribe((res) => {
      expect(res.length).toBeGreaterThan(0);
    });

    const req = httpMock.expectOne('https://my-json-server.typicode.com/Coffeepaw/AyD1API/Card');
    expect(req.request.method).toBe('GET');
    req.flush(dummyCardListResponse);
  });

  it('card should be an id', () => {
    service.getCards().subscribe((res) => {
      expect(Object.keys(res[0])).toContain('id');
    });

    const req = httpMock.expectOne('https://my-json-server.typicode.com/Coffeepaw/AyD1API/Card');
    expect(req.request.method).toBe('GET');
    req.flush(dummyCardListResponse);
  });

  it('card should be a name', () => {
    service.getCards().subscribe((res) => {
      expect(res[0].name.length).toBeGreaterThanOrEqual(1);
    });

    const req = httpMock.expectOne('https://my-json-server.typicode.com/Coffeepaw/AyD1API/Card');
    expect(req.request.method).toBe('GET');
    req.flush(dummyCardListResponse);
  });

  it('card should be a image', () => {
    service.getCards().subscribe((res) => {
      expect(res[0].image.length).toBeGreaterThanOrEqual(1);
    });

    const req = httpMock.expectOne('https://my-json-server.typicode.com/Coffeepaw/AyD1API/Card');
    expect(req.request.method).toBe('GET');
    req.flush(dummyCardListResponse);
  });

  it('charge rate should be a number', () => {
    service.getCards().subscribe((res) => {
      expect(typeof res[0].chargeRate === 'number').toBeTrue();
    });

    const req = httpMock.expectOne('https://my-json-server.typicode.com/Coffeepaw/AyD1API/Card');
    expect(req.request.method).toBe('GET');
    req.flush(dummyCardListResponse);
  });

  it('charge rate should be a positive number or zero', () => {
    service.getCards().subscribe((res) => {
      expect(res[0].id).toBeGreaterThanOrEqual(0);
    });

    const req = httpMock.expectOne('https://my-json-server.typicode.com/Coffeepaw/AyD1API/Card');
    expect(req.request.method).toBe('GET');
    req.flush(dummyCardListResponse);
  });

});
