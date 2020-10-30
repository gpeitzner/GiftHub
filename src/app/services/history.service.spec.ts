import { TestBed } from '@angular/core/testing';
import { history as dummyHistory } from '../mocks/history';

import { HistoryService } from './history.service';

describe('HistoryService', () => {
  let service: HistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getHistory', (done) => {
    service.getHistory('1').then((res) => {
      expect(res).toEqual(dummyHistory);
      done();
    });
  });
});
