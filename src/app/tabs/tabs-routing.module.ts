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
        path: '',
        redirectTo: '/tabs/inicia-viagem',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/inicia-viagem',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
