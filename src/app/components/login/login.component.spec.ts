import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';

import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { CardsComponent } from '../cards/cards.component';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        FormsModule,
        RouterTestingModule.withRoutes([
          { path: 'Catalogo', component: CardsComponent },
          { path: '', component: LoginComponent },
        ]),
      ],
    }).compileComponents();
  });

  function primaryFirestoreMock(): void {
    const input: any[] = [
      { correo: 'prueba@gmail.com', username: 'prueba', password: 'pass123' },
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
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  function secondaryFirestoreMock(): void {
    const data = of([]);
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
    TestBed.compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  it('should create', () => {
    primaryFirestoreMock();
    expect(component).toBeTruthy();
  });

  it('should render login form', () => {
    primaryFirestoreMock();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('#access')).toBeDefined();
    expect(compiled.querySelector('#password')).toBeDefined();
    expect(compiled.querySelector('#login')).toBeDefined();
  });

  it('should login with username and password', () => {
    primaryFirestoreMock();
    component.username = 'prueba@gmail.com';
    component.password = 'pass123';
    component.login();
    expect(component.alert).toBeFalse();
  });

  it('should login with email and password', () => {
    primaryFirestoreMock();
    component.username = 'prueba@gmail.com';
    component.password = 'pass123';
    component.login();
    expect(component.alert).toBeFalse();
  });

  it('should render bad credentials alert', () => {
    secondaryFirestoreMock();
    component.username = 'prueba@gmail.com';
    component.password = 'pass123';
    component.login();
    expect(component.alert).toBeTrue();
    expect(component.username).toEqual('');
    expect(component.password).toEqual('');
  });
});
