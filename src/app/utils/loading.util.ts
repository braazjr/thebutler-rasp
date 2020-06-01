import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable()
export class LoadingUtil {

  constructor(public loadingCtrl: LoadingController) { }

  async criarLoading() {
    const loader = await this.loadingCtrl.create({
      message: 'Carregando...'
    });

    return loader;
  }

}
