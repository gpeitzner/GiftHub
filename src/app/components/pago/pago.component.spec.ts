import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder, FormsModule, FormControl, Validators } from '@angular/forms';
import { PagoComponent } from './pago.component';

import { CarritoService } from 'src/app/services/carrito.service';
import { UserService } from 'src/app/services/user.service';
import { ComprasService } from 'src/app/services/compras.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { UsuarioI } from 'src/app/interfaces/usuario.model';
import { users } from '../../mocks/users';
import { carrito } from '../../mocks/Carrito';
import { tipoC } from '../../mocks/Carrito';
import { Observable, of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TipoCambioService } from 'src/app/services/tipo-cambio.service';
import 'intl/locale-data/jsonp/en-ZA';

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
        { provide: ComprasService, useClass: ComprasServiceMock },
        { provide: UserService, useClass: UserServiceMock },
        { provide: CarritoService, useClass: CarritoServiceMock },
        { provide: TipoCambioService, useClass: TipoCabioServiceMock }

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


  it('Numero Tarjeta field validity', () => {
    let errors = {};
    // tslint:disable-next-line: prefer-const
    let numeroT = component.Formulario.controls.NumeroT;
    errors = numeroT.errors || {};
    // tslint:disable-next-line: no-string-literal
    expect(errors['required']).toBeTruthy();
  });

  it('Numero Tarjeta formato Correcto', () => {
    let errors = {};
    component.Formulario.controls.NumeroT.setValue('1234abc4 1234 1234');
    fixture.nativeElement.querySelector('button').click();
    errors = component.Formulario.controls.NumeroT.errors || {};
    // tslint:disable-next-line: no-string-literal
    expect(errors['pattern']).toBeTruthy();
    expect(component.Formulario.controls.NumeroT.valid).toBeFalsy();
  });

  it('generacion id de 8 digitos', () => {
    const id: string = component.uuidv4();
    expect(id.length).toEqual(8);
    expect(id).toMatch(/^([aA-zZ]|[0-9]){8}$/);
  });

  it('Transacción exitosa', () => {

    component.Formulario.controls.NumeroT.setValue('1234 1234 1234 1234');
    component.Formulario.controls.NombreT.setValue('Mindi Guisela Ajpop Aguilar');
    component.Formulario.controls.ccv.setValue(122);
    component.Formulario.controls.mes.setValue(1);
    component.Formulario.controls.year.setValue(22);
    component.Formulario.controls.moneda.setValue(1);
    fixture.nativeElement.querySelector('button').click();

    expect(component.valid).toBeTruthy(); // .toMatch(/^((0|[1-9]\d*){4})XXXXXXXX(0|[1-9]\d*){4}$/);
  });

  it('transacción incorrecta', () => {
    component.Formulario.controls.NumeroT.setValue('1234abc4 1234 1234');
    component.Formulario.controls.NombreT.setValue('Mindi Guisela Ajpop Aguilar');
    component.Formulario.controls.ccv.setValue('1a2');
    component.Formulario.controls.mes.setValue('01');
    component.Formulario.controls.year.setValue('22');
    component.Formulario.controls.moneda.setValue('1');
    fixture.nativeElement.querySelector('button').click();

    expect(component.valid).toBeFalse();
  });

  it('Encripción del número de tarjeta', () => {
    component.Formulario.controls.NumeroT.setValue('5496 1234 1234 5487');
    component.Formulario.controls.NombreT.setValue('Mindi Guisela Ajpop Aguilar');
    component.Formulario.controls.ccv.setValue('1a2');
    component.Formulario.controls.mes.setValue('01');
    component.Formulario.controls.year.setValue('22');
    component.Formulario.controls.moneda.setValue('1');
    fixture.nativeElement.querySelector('button').click();
    component.registro.tarjeta = component.EncriptarTarjeta(component.Formulario.value.NumeroT);
    expect(component.registro.tarjeta).toMatch(/^((0|[1-9]\d*){4})X{8}(0|[1-9]\d*){4}$/);
  });

  it('mock tasa de cambio', () => {
    component.ObtenerTipoCambio();
    expect(component.Cambio).toEqual(7.85);
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
    customIdName: users[4].email
  };
}

class CarritoServiceMock {
  getCarrito(email: any): Observable<any[]> {
    return of(carrito);
  }

  DeleteTarjeta(email: any, id: any): any {
    return of({});
  }
}

class ComprasServiceMock {
  CrearHistorial(email: any, data: any): any {
    return of({});
  }

  CreateInventario(email: any, id: any, data: any): any {
    return of({});
  }
}
class TipoCabioServiceMock {
  getTipoCambio(): any {
    return of(tipoC);
  }
}
