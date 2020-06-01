import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'inicia-viagem',
    loadChildren: () => import('./pages/inicia-viagem/inicia-viagem.module').then( m => m.IniciaViagemPageModule)
  },
  {
    path: 'download-dados',
    loadChildren: () => import('./pages/download-dados/download-dados.module').then( m => m.DownloadDadosPageModule)
  },
  {
    path: 'embarque-moradores',
    loadChildren: () => import('./pages/embarque-moradores/embarque-moradores.module').then( m => m.EmbarqueMoradoresPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
