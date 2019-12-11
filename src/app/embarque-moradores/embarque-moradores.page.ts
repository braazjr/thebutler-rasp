import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LeituraQrCodeComponent } from '../components/leitura-qr-code/leitura-qr-code.component';
import { SharedService } from '../services/shared.service';

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
          this.checkMorador(2);
        }
      });
  }

  checkMorador(data: any) {
    const moradores = JSON.parse(localStorage.getItem('usuarios'));
    const morador = moradores.find(mor => mor.viewApartamentosMoradoresID.idMorador == data);

    if (morador) {
      const viagemAtual = JSON.parse(localStorage.getItem('viagem-atual'));
      if (viagemAtual && viagemAtual.moradores && viagemAtual.moradores.find(mor => mor.viewApartamentosMoradoresID.idMorador == morador.viewApartamentosMoradoresID.idMorador)) {
        this.sharedService.showToast('Morador já embarcou!');
      } else if (viagemAtual) {
        if (!viagemAtual.moradores) {
          viagemAtual.moradores = [];
        }

        viagemAtual.moradores.push(morador);
        localStorage.setItem('viagem-atual', JSON.stringify(viagemAtual));
        this.sharedService.showToast('Morador registrado!');
      }
    } else {
      this.sharedService.showToast('Morador não encontrado!');
    }
  }
}
