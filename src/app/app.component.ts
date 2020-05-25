import { Component } from '@angular/core';

import { Platform, ToastController } from '@ionic/angular';
import { AuthService } from './services/auth.service';
import { Network } from '@ionic-native/network/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private authService: AuthService,
    private toastController: ToastController,
    private network: Network
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (this.platform.is('android')) {
        this.initNetworkConfig()
      } else {
        this.login()
      }
    });
  }

  initNetworkConfig() {
    this.network.onDisconnect().subscribe(() => {
      console.log('network was disconnected :-(');
    });

    this.network.onConnect().subscribe(() => {
      this.login()
    });
  }

  login() {
    this.authService.login('juliene.ccorrea@gmail.com', 'juliene.ccorrea@gmail.com')
      .subscribe(
        () => { },
        async error => {
          console.error(error);

          const toast = await this.toastController.create({
            message: 'Houve um problema de conexão',
            duration: 100000
          });
          toast.present();
        }
      )
  }
}
