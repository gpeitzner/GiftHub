import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { CarritoService } from './carrito.service';


describe('CarritoService', () => {
  let service: CarritoService;


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

    service = TestBed.inject(CarritoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
