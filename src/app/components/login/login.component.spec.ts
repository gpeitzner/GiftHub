import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render login form', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('#access')).toBeDefined();
    expect(compiled.querySelector('#password')).toBeDefined();
    expect(compiled.querySelector('#login')).toBeDefined();
  });

  it('should login with username and password', () => {
    component.username = 'user1';
    component.password = 'pass1';
    component.login();
    expect(component.alert).toBeFalse();
  });

  it('should login with email and password', () => {
    component.username = 'user2@email.com';
    component.password = 'pass2';
    component.login();
    expect(component.alert).toBeFalse();
  });

  it('should render bad credentials alert', () => {
    component.username = 'user1';
    component.password = 'pass2';
    component.login();
    expect(component.alert).toBeTrue();
    expect(component.username).toEqual('');
    expect(component.password).toEqual('');
  });
});
