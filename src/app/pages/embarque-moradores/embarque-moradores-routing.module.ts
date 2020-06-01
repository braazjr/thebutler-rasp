import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmbarqueMoradoresPage } from './embarque-moradores.page';

const routes: Routes = [
  {
    path: '',
    component: EmbarqueMoradoresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmbarqueMoradoresPageRoutingModule {}
