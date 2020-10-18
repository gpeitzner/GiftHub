import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {
  total: number;

  months = [
    { id: 1, mm: '01' },
    { id: 2, mm: '02' },
    { id: 3, mm: '03' },
    { id: 4, mm: '04' },
    { id: 5, mm: '05' },
    { id: 6, mm: '06' },
    { id: 7, mm: '07' },
    { id: 8, mm: '08' },
    { id: 9, mm: '09' },
    { id: 10, mm: '10' },
    { id: 11, mm: '11' },
    { id: 12, mm: '12' },
  ];

  years = [
    { id: 20, yy: '2020' },
    { id: 21, yy: '2021' },
    { id: 22, yy: '2022' },
    { id: 23, yy: '2023' },
    { id: 24, yy: '2024' },
    { id: 25, yy: '2025' },
    { id: 26, yy: '2026' },
    { id: 27, yy: '2027' },
    { id: 28, yy: '2028' },
    { id: 29, yy: '2029' },
    { id: 30, yy: '2030' },
    { id: 31, yy: '2031' },
  ];
  Formulario: FormGroup;
  valid: boolean;
  constructor(private formBuilder: FormBuilder) {
    this.Formulario = this.formBuilder.group({
      NombreT: ['', Validators.required],
      NumeroT: ['', Validators.required],
      mes: ['', Validators.required],
      year: ['', Validators.required],
      ccv: ['', Validators.required],
    });
    this.total = 500.00;

  }

  ngOnInit(): void {
  }
  Pay(): any {
    this.valid = false;
    let formularioValido = 'no_valido';
    console.log('Valores del form --> ', this.Formulario.value);
    if (this.Formulario.valid) {
      this.valid = true;
      formularioValido = 'valido';
    }
    console.log('Respuesta del servicio de pago --> ', formularioValido);
    return formularioValido;
  }

}
