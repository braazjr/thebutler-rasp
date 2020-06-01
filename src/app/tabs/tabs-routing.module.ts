import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { TabsGuardGuard } from './tabs-guard.guard';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    canActivate: [TabsGuardGuard],
    children: [
      {
        path: 'inicia-viagem',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/inicia-viagem/inicia-viagem.module').then(m => m.IniciaViagemPageModule)
          }
        ]
      },
      {
        path: 'download-dados',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/download-dados/download-dados.module').then(m => m.DownloadDadosPageModule)
          }
        ]
      },
      {
        path: 'embarque-moradores',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/embarque-moradores/embarque-moradores.module').then(m => m.EmbarqueMoradoresPageModule)
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
