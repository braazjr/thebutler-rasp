import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmbarqueMoradoresPageRoutingModule } from './embarque-moradores-routing.module';

import { EmbarqueMoradoresPage } from './embarque-moradores.page';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmbarqueMoradoresPageRoutingModule,
    SharedModule
  ],
  declarations: [EmbarqueMoradoresPage]
})
export class EmbarqueMoradoresPageModule {}
