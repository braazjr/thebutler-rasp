import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  iniciaFinalizaText = 'Inicia';
  hasViagemAtual: boolean = false;

  constructor() {
    if (localStorage.getItem('viagem-atual')) {
      this.iniciaFinalizaText = 'Finaliza';
      this.hasViagemAtual = true;
    } else {
      this.iniciaFinalizaText = 'Inicia';
      this.hasViagemAtual = false;
    }
  }
}
