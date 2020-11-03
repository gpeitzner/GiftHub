import { TestBed } from '@angular/core/testing';
import { history as dummyHistory, rHistory } from '../mocks/history';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from './user.service';
import { HistoryService } from './history.service';

describe('HistoryService', () => {
  let service: HistoryService;
  let serviceUser: UserService;

  const AngularFirestoreStub = {
    doc: () => ({
        collection: () => ({
            valueChanges: () => ({
              subscribe: (cb) => {
                cb(dummyHistory);
              }
            })
        })
    }),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AngularFirestore, useValue: AngularFirestoreStub },
      ],
    });
    service = TestBed.inject(HistoryService);
    serviceUser = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getHistory', (done) => {
    serviceUser.user = {
      id: 'XXXX',
      username: 'XXX',
      password: 'XXXX',
      nombre: 'XXX',
      apellido: 'XXX',
      correo: 'XXX',
      dpi: 'XXX',
      edad: '0'
    };

    service.getHistory().then((res) => {
      expect(res).toEqual(rHistory);
      done();
    })
    .catch(() => {
      done();
    });
  });
});
