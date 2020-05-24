import { Component } from '@angular/core';

import { Platform, ToastController } from '@ionic/angular';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private authService: AuthService,
    private toastController: ToastController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.authService.login('juliene.ccorrea@gmail.com', 'juliene.ccorrea@gmail.com')
        .subscribe(
          () => null,
          async error => {
            console.error(error);

            const toast = await this.toastController.create({
              message: 'Houve um problema de conexão',
              duration: 100000
            });
            toast.present();
          }
        )
    });
  }
}
