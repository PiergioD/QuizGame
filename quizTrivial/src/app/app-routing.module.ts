import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

import { ListaDomandeComponent } from './components/lista-domande/lista-domande.component';

const routes: Routes = [
  { path: '', redirectTo: '/categoria', pathMatch: 'full' },
  {
    path: 'categoria',
    component: HomeComponent,
  },
  {
    path: 'domande',
    component: ListaDomandeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
