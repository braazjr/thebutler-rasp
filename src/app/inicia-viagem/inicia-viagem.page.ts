import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LeituraQrCodeComponent } from '../components/leitura-qr-code/leitura-qr-code.component';

@Component({
  selector: 'app-inicia-viagem',
  templateUrl: './inicia-viagem.page.html',
  styleUrls: ['./inicia-viagem.page.scss'],
})
export class IniciaViagemPage implements OnInit {

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  async iniciaFinalizaViagem() {
    console.info('-- iniciando/finalizando a viagem')

    const modal = await this.modalController.create({
      component: LeituraQrCodeComponent
    });
    return await modal.present();
  }
}
