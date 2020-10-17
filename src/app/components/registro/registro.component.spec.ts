import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder,FormsModule } from '@angular/forms';
import { RegistroComponent } from './registro.component';

describe('RegistroComponent', () => {
  let component: RegistroComponent;
  let fixture: ComponentFixture<RegistroComponent>;
  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        RegistroComponent
      ],
      imports: [FormsModule,ReactiveFormsModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render register form', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('#username')).toBeDefined();
    expect(compiled.querySelector('#password')).toBeDefined();
    expect(compiled.querySelector('#nombre')).toBeDefined();
    expect(compiled.querySelector('#apellido')).toBeDefined();
    expect(compiled.querySelector('#correo')).toBeDefined();
    expect(compiled.querySelector('#dpi')).toBeDefined();
    expect(compiled.querySelector('#edad')).toBeDefined();
  });
  
  it('should response correct by not filling all the fields', () => {
    component.registerForm = formBuilder.group({
      username: 'usertest',
      password: 'pass123',
      nombre: 'Test',
      apellido: 'Test',
      dpi: '30018959',
      correo: 'test@gmail.com',
      edad: '22'
    });
    fixture.nativeElement.querySelector('button').click();
    expect(component.valid).toBeTrue();
  });
});
