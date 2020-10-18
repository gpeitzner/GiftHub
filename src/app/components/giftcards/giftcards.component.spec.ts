import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftcardsComponent } from '../giftcards/giftcards.component';
import { giftcards} from '../../mocks/giftcards';
describe('GiftcardsComponent', () => {
  let component: GiftcardsComponent;
  let fixture: ComponentFixture<GiftcardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiftcardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
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
    expect(compiled.querySelector('#id')).toBeDefined();
  });
});
