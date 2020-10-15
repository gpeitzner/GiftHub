import { TestBed } from '@angular/core/testing';
import { CardService } from './card.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { cards } from '../mocks/cards';

describe('CardService', () => {
  let service: CardService;
  const mockCards = cards;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CardService],
    });
    service = TestBed.inject(CardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
