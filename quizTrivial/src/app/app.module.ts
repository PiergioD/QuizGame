import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';

import { ListaDomandeComponent } from './components/lista-domande/lista-domande.component';

import { FormsModule } from '@angular/forms';
import { DomandaComponent } from './components/domanda/domanda.component';
import { RandomizeOrderPipe } from './shared/randomize-order.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DomandaComponent,
    ListaDomandeComponent,
    RandomizeOrderPipe,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
