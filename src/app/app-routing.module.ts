import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GiftcardsComponent } from './components/giftcards/giftcards.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'giftcards',
    pathMatch: 'full'
  },
  {
    path: 'giftcards',
    component: GiftcardsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
