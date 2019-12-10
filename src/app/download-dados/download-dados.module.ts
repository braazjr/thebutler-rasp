import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DownloadDadosPageRoutingModule } from './download-dados-routing.module';

import { DownloadDadosPage } from './download-dados.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DownloadDadosPageRoutingModule
  ],
  declarations: [DownloadDadosPage]
})
export class DownloadDadosPageModule {}
