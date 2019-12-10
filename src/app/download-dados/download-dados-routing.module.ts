import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DownloadDadosPage } from './download-dados.page';

const routes: Routes = [
  {
    path: '',
    component: DownloadDadosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DownloadDadosPageRoutingModule {}
