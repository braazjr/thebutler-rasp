import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, ActionSheetController } from '@ionic/angular';
import { LeituraQrCodeComponent } from '../../components/leitura-qr-code/leitura-qr-code.component';
import { UsuarioService } from '../../services/usuario.service';
import { SharedService } from '../../services/shared.service';
import { RotaService } from '../../services/rota.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicia-viagem',
  templateUrl: './inicia-viagem.page.html',
  styleUrls: ['./inicia-viagem.page.scss'],
})
export class IniciaViagemPage implements OnInit {

  viagem: any;

  constructor(
    private modalController: ModalController,
    private usuarioService: UsuarioService,
    private sharedService: SharedService,
    private alertController: AlertController,
    private actionSheetController: ActionSheetController,
    private rotaService: RotaService,
    private router: Router
  ) { }

  ngOnInit() {
    this.viagem = JSON.parse(localStorage.getItem('viagem-atual'));
  }

  async iniciaFinalizaViagem() {
    console.info('-- iniciando/finalizando a viagem')

    const modal = await this.modalController.create({
      component: LeituraQrCodeComponent
    });

    await modal.present();

    modal.onDidDismiss()
      .then(data => {
        if (data.data) {
          console.info('-- motorista informado', data.data);

          this.usuarioService.pesquisarMotorista(data.data)
            .subscribe(result => {
              if (!result) {
                this.sharedService.showToast('Motorista não encontrado!', 10000)
              } else {
                console.info('-- motorista encontrado', result);

                if (this.viagem) {
                  this.finalizaViagem();
                } else {
                  this.viagem = { motoristaId: result['id'] }
                  this.iniciaViagem();
                }
              }
            })
        }
      })
  }

  async finalizaViagem() {
    const alert = await this.alertController.create({
      header: 'Finaliza viagem!',
      message: 'Deseja finalizar a viagem?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Sim',
          handler: () => {
            this.fechaViagem();
          }
        }
      ]
    });

    await alert.present();
  }

  async iniciaViagem() {
    const alert = await this.alertController.create({
      header: 'Inicia viagem!',
      message: 'Deseja inicializar a viagem?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Sim',
          handler: async () => {
            this.getRotas();
          }
        }
      ]
    });

    await alert.present();
  }

  async getRotas() {
    this.rotaService.getRotas()
      .subscribe(async (data: any[]) => {
        console.info('-- rotas encontradas', data);

        const rotasActionSheet = data.map(rota => ({
          text: rota.nome,
          handler: () => {
            this.criaViagem(rota);
          }
        }))

        const actionSheet = await this.actionSheetController.create({
          header: 'Rotas',
          buttons: rotasActionSheet
        });
        await actionSheet.present();
      });
  }

  criaViagem(rota) {
    console.info('-- rota selecionada', rota);

    this.viagem.rotaId = rota.id;
    this.viagem.dataHoraInicio = new Date();
    localStorage.setItem('viagem-atual', JSON.stringify(this.viagem));

    this.sharedService.showToast('Viagem iniciada!');
    this.router.navigate(['/tabs/embarque-moradores']);
  }

  fechaViagem() {
    this.viagem.dataHoraFim = new Date();
    let viagensTemp = JSON.parse(localStorage.getItem('viagens-temp'));
    if (!viagensTemp) {
      viagensTemp = [];
    }

    viagensTemp.push(this.viagem);
    localStorage.setItem('viagens-temp', JSON.stringify(viagensTemp));
    localStorage.removeItem('viagem-atual');
    this.viagem = undefined;

    this.sharedService.showToast('Viagem finalizada!');
  }
}
