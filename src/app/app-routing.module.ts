import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'inicia-viagem',
    loadChildren: () => import('./inicia-viagem/inicia-viagem.module').then( m => m.IniciaViagemPageModule)
  },
  {
    path: 'download-dados',
    loadChildren: () => import('./download-dados/download-dados.module').then( m => m.DownloadDadosPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
