import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CarritoService } from 'src/app/services/carrito.service';
import { UserService } from 'src/app/services/user.service';
import { TipoCambioService } from 'src/app/services/tipo-cambio.service';
import { ComprasService } from 'src/app/services/compras.service';
import { Card3, Card2 } from '../../interfaces/card';
import { Router } from '@angular/router';


@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {
  total: number; // total quetzales
  total2: number; // total dolares
  ver: boolean;
  type: string;
  valNum: string;
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
    { id: 20, yy: '20' },
    { id: 21, yy: '21' },
    { id: 22, yy: '22' },
    { id: 23, yy: '23' },
    { id: 24, yy: '24' },
    { id: 25, yy: '25' },
    { id: 26, yy: '26' },
    { id: 27, yy: '27' },
    { id: 28, yy: '28' },
    { id: 29, yy: '29' },
    { id: 30, yy: '30' },
    { id: 31, yy: '31' },
  ];
  moneda = [
    { id: 1, v: 'Quetzales Q.' },
    { id: 2, v: 'Dólares $.' }
  ];
  Formulario: FormGroup;
  valid: boolean;
  usuario: string;
  datos: Card3[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private tipoC: TipoCambioService,
    private carritoS: CarritoService,
    private userS: UserService,
    private comprasS: ComprasService,
    private router: Router) {

    this.Formulario = this.formBuilder.group({
      NombreT: ['', Validators.required,],
      NumeroT: new FormControl('', [Validators.required, Validators.pattern(/^((0|[1-9]\d*){4} ){3}(0|[1-9]\d*){4}$/)]),
      mes: new FormControl('MM', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      year: new FormControl('YY', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      ccv: new FormControl('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*){3}$/)]),
      moneda: new FormControl('Moneda', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
    });
    this.total = 0;
    this.total2 = 0;

  }

  ngOnInit(): void {
    this.ver = false;
    this.type = 'password';
    this.valNum = '';
    this.CalcularTotal();
    console.log(this.total);
    this.ObtenerTipoCambio();
  }

  ObtenerTipoCambio(): void {
    this.tipoC.getTipoCambio().subscribe((result) => {
      console.log('tipo cambio');
      console.log(result[0].total);
      this.total2 = this.total * parseFloat(result[0].total);
      this.total2 = Number(this.total2.toFixed(2));
    }, () => { });
  }

  CalcularTotal(): void {
    this.usuario = this.userS.user.correo;
    this.total = 0;
    this.carritoS.getCarrito(this.usuario)
      .subscribe((result) => {
        this.datos = result;
        // tslint:disable-next-line: prefer-for-of
        for (let x = 0; x < this.datos.length; x++) {
          this.total = this.total + (this.datos[x].total + (this.datos[x].chargeRate * this.datos[x].cantidad));
          this.total = Number(this.total.toFixed(2));
        }
      }, () => { }
      );

  }

  Pay(): any {
    this.valid = false;
    let formularioValido = 'no_valido';
    console.log('Valores del form --> ', this.Formulario.value);
    if (this.Formulario.valid) {
      this.valid = true;
      console.log(this.Formulario.value.username);
      formularioValido = 'valido';
      let descripcion: string;
      descripcion = 'articulos:\n';
      let registro = {};
      // tslint:disable-next-line: prefer-for-of
      for (let x = 0; x < this.datos.length; x++) {
        descripcion = descripcion +
          ' tarjeta:' + this.datos[x].nombre +
          ' cantidad:' + this.datos[x].cantidad +
          ' subtotal:' + this.datos[x].total + '\n';

      }

      // ingresamos a la base
      let tot: number;
      let moneda: string;
      moneda = '';
      tot = 0;
      if (this.Formulario.value.moneda === 1) {
        tot = this.total2;
        moneda = 'quetzales';
      } else {
        tot = this.total;
        moneda = 'dolares';
      }

      let numeroTarjeta = [];
      numeroTarjeta = String(this.Formulario.value.NumeroT).split(' ');



      const date: Date = new Date();
      registro = {
        Fecha: date.toLocaleDateString(),
        Hora: date.toLocaleTimeString(),
        Total: tot,
        Descripcion: descripcion,
        Moneda: moneda,
        estado: true,
        tarjeta: numeroTarjeta[0] + 'XXXXXXXX' + numeroTarjeta[3]

      };
      this.comprasS.CrearHistorial(this.usuario, registro).then(res => {
        console.log(res);
      });
      this.LlenarInventario();

      return this.valid;
      //  console.log(JSON.stringify(registro));
    }
    console.log('Respuesta del servicio de pago --> ', formularioValido);

    return this.valid;

  }

  LlenarInventario(): void {
    // tslint:disable-next-line: prefer-for-of
    for (let x = 0; x < this.datos.length; x++) {
      const obj = {
        image: this.datos[x].imagen,
        name: this.datos[x].nombre,
        cantidad: this.datos[x].cantidad

      };
      this.comprasS.CreateInventario(this.usuario, obj).then(res => {
        console.log('agregado a inventario');
        return;
      });

      this.EliminarTarjeta(this.datos[x]);
    }
  }

  CambiarEstado(): any {
    if (this.ver) {
      this.ver = false;
      this.type = 'password';
    } else {
      this.ver = true;
      this.type = 'text';
    }
  }

  FormatearEntrada(): any {
    if (this.valNum.length === 4) {
      this.valNum = this.valNum + ' ';
    } else if (this.valNum.length === 9) {
      this.valNum = this.valNum + ' ';
    } else if (this.valNum.length === 14) {
      this.valNum = this.valNum + ' ';
    }
  }

  EliminarTarjeta(tarjeta: Card3): void {
    this.carritoS.DeleteTarjeta(this.usuario, tarjeta.customIdName).then(res => {
      console.log('eliminado correctamente');
      return;
    }, () => { }
    );
  }
}
