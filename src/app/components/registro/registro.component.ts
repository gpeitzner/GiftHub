import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  registerForm: FormGroup;
  valid: boolean;

  constructor(private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', Validators.required],
      dpi: ['', Validators.required],
      edad: ['', Validators.required],
    });
  }
  ngOnInit(): void {}

  register(): any {
    this.valid = false;
    let userRegister = 'no_register';
    console.log('Valores del form --> ', this.registerForm.value);
    if (this.registerForm.valid) {
      this.valid = true;
      userRegister = 'register';
    }
    console.log('Respuesta del servicio de registro --> ', userRegister);
    return userRegister;
  }
}
