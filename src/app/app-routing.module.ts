import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardsComponent } from './components/cards/cards.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { GiftcardsComponent } from './components/giftcards/giftcards.component';
import { PagoComponent } from './components/pago/pago.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { HistoryComponent } from './components/history/history.component';
import {CarritoComponent} from './components/carrito/carrito.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  { path: 'register', component: RegistroComponent },
  { path: 'Catalogo', component: CardsComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'giftcards',
    component: GiftcardsComponent,
  },
  { path: 'pago', component: PagoComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'Carrito', component: CarritoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
