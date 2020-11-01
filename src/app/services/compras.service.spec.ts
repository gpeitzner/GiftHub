import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { ComprasService } from './compras.service';

describe('ComprasService', () => {
  let service: ComprasService;
  const AngularFirestoreStub = {
    collection: (someString) => {
      return [];
    },
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AngularFirestore, useValue: AngularFirestoreStub },
      ]
    });
    service = TestBed.inject(ComprasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
