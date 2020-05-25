import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { SharedService } from 'src/app/services/shared.service';

import QRScanner from 'qr-code-scanner';

@Component({
  selector: 'app-leitura-qr-code',
  templateUrl: './leitura-qr-code.component.html',
  styleUrls: ['./leitura-qr-code.component.scss'],
})
export class LeituraQrCodeComponent implements OnInit {

  countTentativas: number = 0;

  constructor(
    private modalController: ModalController,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.showQRScanner();
  }

  tentarNovamente() {
    this.showQRScanner();
  }

  showQRScanner() {
    QRScanner.initiate({
      onResult: (result) => {
        console.info(result);
        // this.consultaMorador(result);
        this.modalController.dismiss(result);
      },
      onTimeout: () => {
        console.info('-- tempo esgotado')
        this.countTentativas++;
        console.log(this.countTentativas);
      },
      onError: (error) => {
        console.error(error)
      },
      timeout: 10000,
    });
  }

  async consultaMorador(codigo) {
    const moradores = JSON.parse(localStorage.getItem('moradores'));
    const moradorEncontrado = moradores.find(morador => morador.codigo == codigo);
    // const moradorEncontrado = moradores[0];
    console.log('-- morador encontrado', moradorEncontrado);

    if (!moradorEncontrado) {
      this.sharedService.showToast('Morador não encontrado!', 5000)
    }

    this.modalController.dismiss(moradorEncontrado);
  }
}
