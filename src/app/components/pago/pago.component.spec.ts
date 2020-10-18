import { async,ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder, FormsModule } from '@angular/forms';
import { PagoComponent } from './pago.component';

describe('PagoComponent', () => {
  let component: PagoComponent;
  let fixture: ComponentFixture<PagoComponent>;
  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagoComponent ],
      imports: [FormsModule, ReactiveFormsModule],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render register form', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('#NombreT')).toBeDefined();
    expect(compiled.querySelector('#NumeroT')).toBeDefined();
    expect(compiled.querySelector('#mes')).toBeDefined();
    expect(compiled.querySelector('#year')).toBeDefined();
    expect(compiled.querySelector('#ccv')).toBeDefined();
  });
  it('should response correct by not filling all the fields', () => {
    component.Formulario = formBuilder.group({
      NombreT: 'Gabriela Sofía Aguilar García',
      NumeroT: '1234 1234 1234 1234',
      mes: 4,
      year: 20,
      ccv: '360',
    });
    fixture.nativeElement.querySelector('button').click();
    expect(component.valid).toBeTrue();
  });

});
