import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarritoService } from 'src/app/services/carrito.service';
import { UserService } from 'src/app/services/user.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { CarritoComponent } from './carrito.component';
import { UsuarioI } from 'src/app/interfaces/usuario.model';
import { users } from '../../mocks/users';
import { carrito } from '../../mocks/Carrito';
import { Observable, of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
describe('CarritoComponent', () => {
  let component: CarritoComponent;
  let fixture: ComponentFixture<CarritoComponent>;
  const mockUser = users[0];
  const AngularFirestoreStub = {
    collection: (someString) => {
      return [];
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      declarations: [CarritoComponent],
      providers: [
        { provide: AngularFirestore, useValue: AngularFirestoreStub },
        { provide: UserService, useClass: UserServiceMock }, { provide: CarritoService, useClass: CarritoServiceMock }
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
    edad: '22'
  };
}

class CarritoServiceMock{
  getCarrito(email: any): Observable<any[]>  {
    return of (carrito);
  }
}
