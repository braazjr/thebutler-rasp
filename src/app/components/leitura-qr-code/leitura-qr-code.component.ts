import { Component, OnInit } from '@angular/core';

import QRScanner from 'qr-code-scanner';

@Component({
  selector: 'app-leitura-qr-code',
  templateUrl: './leitura-qr-code.component.html',
  styleUrls: ['./leitura-qr-code.component.scss'],
})
export class LeituraQrCodeComponent implements OnInit {

  countTentativas: number = 0;

  constructor() { }

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
      },
      onTimeout: (timeout) => {
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
}
