import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CardService } from './card.service';
import { cards } from '../mocks/cards';

describe('CardService', async () => {
  let httpMock: HttpTestingController;
  let service: CardService;
  const dummyCardListResponse = cards;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CardService],
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
