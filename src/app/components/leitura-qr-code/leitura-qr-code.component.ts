import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { SharedService } from 'src/app/services/shared.service';
import { BarcodeScannerOptions, BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

// import QRScanner from 'qr-code-scanner';

@Component({
  selector: 'app-leitura-qr-code',
  templateUrl: './leitura-qr-code.component.html',
  styleUrls: ['./leitura-qr-code.component.scss'],
})
export class LeituraQrCodeComponent implements OnInit {

  countTentativas: number = 0;

  constructor(
    private modalController: ModalController,
    private sharedService: SharedService,
    private barcodeScanner: BarcodeScanner
  ) { }

  ngOnInit() {
    this.showQRScanner();
  }

  tentarNovamente() {
    this.showQRScanner();
  }

  showQRScanner() {
    const options: BarcodeScannerOptions = {
      // preferFrontCamera: true,
      // showFlipCameraButton: true,
      showTorchButton: true,
      torchOn: false,
      prompt: 'Aproxime o QRCode da câmera',
      resultDisplayDuration: 500,
      formats: 'QR_CODE,PDF_417',
      // orientation: 'landscape',
    };

    this.barcodeScanner.scan(options).then(barcodeData => {
      console.log('Code', barcodeData.text);
      
      this.consultaMorador(barcodeData.text)
    }).catch(err => {
      console.log('Error', err);
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
