import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardsComponent } from './components/cards/cards.component';

const routes: Routes = [
  { path: 'Catalogo', component: CardsComponent},
  { path: '', pathMatch: 'full', redirectTo: 'Catalogo' },
  { path: '**', pathMatch: 'full', redirectTo: 'Catalogo' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
