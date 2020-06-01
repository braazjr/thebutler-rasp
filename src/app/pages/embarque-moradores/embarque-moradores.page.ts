import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LeituraQrCodeComponent } from '../../components/leitura-qr-code/leitura-qr-code.component';
import { SharedService } from '../../services/shared.service';

import * as moment from 'moment';

@Component({
  selector: 'app-embarque-moradores',
  templateUrl: './embarque-moradores.page.html',
  styleUrls: ['./embarque-moradores.page.scss'],
})
export class EmbarqueMoradoresPage implements OnInit {

  constructor(
    private modalController: ModalController,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
  }

  async embarque() {
    const modal = await this.modalController.create({
      component: LeituraQrCodeComponent
    });

    await modal.present();

    modal.onDidDismiss()
      .then(data => {
        if (data.data) {
          console.info('-- morador informado', data.data);

          // this.checkMorador(data.data);
          this.checkMorador(data.data);
        }
      });
  }

  checkMorador(data: any) {
    const moradores = JSON.parse(localStorage.getItem('moradores'));
    const morador = moradores.find(mor => mor.id == data);

    if (morador) {
      const viagemAtual = JSON.parse(localStorage.getItem('viagem-atual'));
      if (viagemAtual && viagemAtual.passageiros && viagemAtual.passageiros.find(pas => pas.id == morador.id)) {
        this.sharedService.showToast('Morador já embarcou!');
      } else if (viagemAtual) {
        if (!viagemAtual.passageiros) {
          viagemAtual.passageiros = [];
        }

        viagemAtual.passageiros.push({passageiroId: morador.id, horario: moment().format('HH:mm')});
        localStorage.setItem('viagem-atual', JSON.stringify(viagemAtual));
        this.sharedService.showToast('Morador registrado!');
      }
    } else {
      this.sharedService.showToast('Morador não encontrado!');
    }
  }
}
