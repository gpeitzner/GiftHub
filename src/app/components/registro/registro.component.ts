import { Component, OnInit } from '@angular/core';
import { RegistroService } from 'src/app/services/registro.service';
import { CarritoService } from 'src/app/services/carrito.service';
import { ComprasService } from 'src/app/services/compras.service';
import { Router } from '@angular/router';
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
  constructor(
    private formBuilder: FormBuilder,
    private CarritoS: CarritoService,
    private ComprasS: ComprasService,
    private registroS: RegistroService,
    private router: Router
  ) {
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
  ngOnInit(): void { }

  register(): any {
    this.valid = false;
    let userRegister = 'no_register';

    if (this.registerForm.valid) {
      this.valid = true;
      userRegister = 'register';
      this.registroS.form.value.username = this.registerForm.value.username;
      this.registroS.form.value.nombre = this.registerForm.value.nombre;
      this.registroS.form.value.apellido = this.registerForm.value.apellido;
      this.registroS.form.value.password = this.registerForm.value.password;
      this.registroS.form.value.correo = this.registerForm.value.correo;
      this.registroS.form.value.dpi = this.registerForm.value.dpi;
      this.registroS.form.value.edad = this.registerForm.value.edad;
      const data = this.registroS.form.value;
      this.registroS.createUser(data).then(res => {
        console.log(res);
      });
      this.router.navigateByUrl('/login');
    }
    console.log('Respuesta del servicio de registro --> ', userRegister);
    return userRegister;
  }
}
