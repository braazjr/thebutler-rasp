import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { MoradorService } from '../services/morador.service';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-download-dados',
  templateUrl: './download-dados.page.html',
  styleUrls: ['./download-dados.page.scss'],
})
export class DownloadDadosPage implements OnInit {

  moradores: any[] = [];

  constructor(
    private moradorService: MoradorService,
    private toastController: ToastController,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.moradores = this.sharedService.getMoradores()
  }

  fazerDownload() {
    console.info('-- iniciando download de dados')
    this.moradorService.downloadMoradores()
      .subscribe(async data => {
        console.info('download usuários', data);
        localStorage.setItem('usuarios', JSON.stringify(data));
        this.moradores = this.sharedService.getMoradores()

        const toast = await this.toastController.create({
          message: 'Base de usuários atualizada',
          duration: 2000
        });
        toast.present();
      })
  }
}
