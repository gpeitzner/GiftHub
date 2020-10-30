import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { CardsComponent } from './components/cards/cards.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { CardService } from './services/card.service';
import { RegistroComponent } from './components/registro/registro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GiftcardsComponent } from './components/giftcards/giftcards.component';
import { PagoComponent } from './components/pago/pago.component';
import { PerfilComponent } from './components/perfil/perfil.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CardsComponent,
    RegistroComponent,
    GiftcardsComponent,
    PagoComponent,
    PerfilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [CardService],
  bootstrap: [AppComponent],
})
export class AppModule {}
