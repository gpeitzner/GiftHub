import { Component, OnInit, ɵConsole } from '@angular/core';
import { CarritoService } from 'src/app/services/carrito.service';
import { UserService } from 'src/app/services/user.service';
import { Card3, Card2 } from '../../interfaces/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  datos: Card3[] = [];
  usuario: string;
  total: number;
  totalRecargo: number;
  constructor(private carritoS: CarritoService, private userS: UserService, private router: Router) { }

  ngOnInit(): void {
    this.cargarCarrito();
  }

  cargarCarrito(): void {
    this.usuario = this.userS.user.correo;
    this.total = 0;
    this.totalRecargo = 0;
    this.carritoS.getCarrito(this.usuario)
      .subscribe((result) => {
        console.log(result);
        this.total = 0;
        this.totalRecargo = 0;
        this.datos = result;
        // tslint:disable-next-line: prefer-for-of
        for (let x = 0; x < this.datos.length; x++) {
          this.datos[x].cantidadActual = this.datos[x].cantidad;
          this.datos[x].cantidadAnterior = this.datos[x].cantidad;
          this.total = this.total + this.datos[x].total;
          this.totalRecargo = this.totalRecargo + this.datos[x].chargeRate * this.datos[x].cantidad;
        }
      }, () => { }
      );
  }

  Recalcular(tarjeta: Card3): void {

    // tslint:disable-next-line: prefer-for-of
    for (let x = 0; x < this.datos.length; x++) {
      if (this.datos[x].customIdName === tarjeta.customIdName) {
        this.datos[x].cantidad = tarjeta.cantidadActual;
        console.log('cambia aca');
        this.datos[x].total = tarjeta.cantidadActual * tarjeta.precio;
      }
    }
    let temp = this.total - tarjeta.cantidadAnterior * tarjeta.precio;
    this.total = 0 + temp + tarjeta.cantidadActual * tarjeta.precio;
    temp = this.totalRecargo - tarjeta.cantidadAnterior * tarjeta.chargeRate;
    this.totalRecargo = 0 + temp + tarjeta.cantidadActual * tarjeta.chargeRate;
    tarjeta.cantidadAnterior = tarjeta.cantidadActual;
    console.log('cambia aca');
    console.log(JSON.stringify(this.datos));
  }

  EliminarTarjeta(tarjeta: Card3): void {



    this.carritoS.DeleteTarjeta(this.usuario, tarjeta.customIdName).then(res => {
      console.log(res);
      /*let temp = this.total - tarjeta.cantidadActual * tarjeta.precio;
      console.log(this.total);
      this.total = 0 + temp;
      temp = this.totalRecargo - tarjeta.cantidadActual * tarjeta.chargeRate;
      this.totalRecargo = 0 + temp;
      console.log(this.total + '**' + this.totalRecargo);*/
    }, () => { }
    );
  }
  ActualizarCarrito(): void {

    // tslint:disable-next-line: prefer-for-of
    for (let x = 0; x < this.datos.length; x++) {
      const obj = {
        cantidad: this.datos[x].cantidad,
        total: this.datos[x].total
      };
      console.log(JSON.stringify(obj));
      this.carritoS.UpdateTarjeta(this.usuario, this.datos[x].customIdName, obj).then(res => {
        console.log(res);

      }, () => { }
      );

    }

  }

  RedireccionCatalogo(): void {
    this.ActualizarCarrito();
    this.router.navigateByUrl('/Catalogo');
  }

  PagoRedireccion(): void {
    this.ActualizarCarrito();
    this.router.navigateByUrl('/pago');
  }
}
