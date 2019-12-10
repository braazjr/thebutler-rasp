import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  iniciaFinalizaText = 'Inicia'

  constructor() {
    this.iniciaFinalizaText = localStorage.getItem('viagem-atual') ? 'Finaliza' : 'Inicia'
  }

}
