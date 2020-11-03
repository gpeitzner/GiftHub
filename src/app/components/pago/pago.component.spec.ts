import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder, FormsModule, FormControl, Validators } from '@angular/forms';
import { PagoComponent } from './pago.component';

import { CarritoService } from 'src/app/services/carrito.service';
import { UserService } from 'src/app/services/user.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { UsuarioI } from 'src/app/interfaces/usuario.model';
import { users } from '../../mocks/users';
import { carrito } from '../../mocks/Carrito';
import { Observable, of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TipoCambioService } from 'src/app/services/tipo-cambio.service';

describe('PagoComponent', () => {
  let component: PagoComponent;
  let fixture: ComponentFixture<PagoComponent>;
  // tslint:disable-next-line: prefer-const
  let httpMock: HttpTestingController;
  const formBuilder: FormBuilder = new FormBuilder();
  const mockUser = users[0];
  const AngularFirestoreStub = {
    collection: (someString) => {
      return [];
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PagoComponent],
      imports: [FormsModule, ReactiveFormsModule, RouterTestingModule.withRoutes([]), HttpClientTestingModule],
      providers: [
        { provide: AngularFirestore, useValue: AngularFirestoreStub },
        { provide: UserService, useClass: UserServiceMock }, { provide: CarritoService, useClass: CarritoServiceMock }
      ],
    }).compileComponents();
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
      NombreT: ['Gabriela', Validators.required],
      NumeroT: new FormControl('1234 1234 1234 1234', [Validators.required, Validators.pattern(/^((0|[1-9]\d*){4} ){3}(0|[1-9]\d*){4}$/)]),
      mes: new FormControl('1', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      year: new FormControl('23', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      ccv: new FormControl('123', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*){3}$/)]),
      moneda: new FormControl('1', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
    });
    fixture.nativeElement.querySelector('button').click();
    expect(component.Formulario.valid).toBeTrue();
  });

  it('Numero Tarjeta field validity', () => {
    let errors = {};
    // tslint:disable-next-line: prefer-const
    let numeroT = component.Formulario.controls.NumeroT;
    errors = numeroT.errors || {};
    // tslint:disable-next-line: no-string-literal
    expect(errors['required']).toBeTruthy();
  });
});

class UserServiceMock {
  user: UsuarioI = {
    username: users[4].username,
    password: users[4].password,
    nombre: 'Mindi',
    apellido: 'Ajpop',
    correo: users[4].email,
    dpi: '3031111430108',
    edad: '22',
    customIdName:  users[4].email
  };
}

class CarritoServiceMock {
  getCarrito(email: any): Observable<any[]> {
    return of(carrito);
  }
}
