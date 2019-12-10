import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'inicia-viagem',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../inicia-viagem/inicia-viagem.module').then(m => m.IniciaViagemPageModule)
          }
        ]
      },
      {
        path: 'download-dados',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../download-dados/download-dados.module').then(m => m.DownloadDadosPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/download-dados',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/download-dados',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
