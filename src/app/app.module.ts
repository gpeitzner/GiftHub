import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { CardsComponent } from './components/cards/cards.component';

import { HttpClientModule } from '@angular/common/http';
import { CardService } from './services/card.service';

@NgModule({
  declarations: [AppComponent, CardsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
  ],
  providers: [CardService],
  bootstrap: [AppComponent],
})
export class AppModule {}
