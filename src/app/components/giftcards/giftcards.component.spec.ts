import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { GiftcardsComponent } from '../giftcards/giftcards.component';
import { of, Observable } from 'rxjs';
import { giftcards} from '../../mocks/giftcards';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
describe('GiftcardsComponent', () => {
  let component: GiftcardsComponent;
  let fixture: ComponentFixture<GiftcardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ GiftcardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
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
    fixture = TestBed.createComponent(GiftcardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Crea los componentes', () => {
    fixture = TestBed.createComponent(GiftcardsComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('#contenedor')).toBeDefined();
    expect(compiled.querySelector('#tarjetas')).toBeDefined();
    expect(compiled.querySelector('#for')).toBeDefined();
  });
});
