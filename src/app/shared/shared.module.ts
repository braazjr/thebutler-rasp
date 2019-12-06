import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeituraQrCodeComponent } from '../components/leitura-qr-code/leitura-qr-code.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    LeituraQrCodeComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [LeituraQrCodeComponent],
  entryComponents: [LeituraQrCodeComponent]
})
export class SharedModule { }
