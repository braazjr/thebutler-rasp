import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(
    private toastController: ToastController
  ) { }

  showErrors(error, titulo) {
    console.error(error);
    if (error.error) {
      error.error.forEach(element => {
        // this.toastService.addToast('error', titulo, element.mensagemUsuario);
      });
    } else if (error.message) {
      // this.toastService.addToast('error', titulo, error.message);
    }
  }

  async showToast(mensagem, tempo?) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: tempo ? tempo : 2000
    });
    toast.present();
  }

  getMoradores() {
    const moradores = JSON.parse(localStorage.getItem('moradores'));
    console.log(moradores)
    return moradores
  }
}
