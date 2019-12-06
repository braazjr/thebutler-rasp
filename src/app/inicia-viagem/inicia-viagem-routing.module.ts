import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IniciaViagemPage } from './inicia-viagem.page';

const routes: Routes = [
  {
    path: '',
    component: IniciaViagemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IniciaViagemPageRoutingModule {}
