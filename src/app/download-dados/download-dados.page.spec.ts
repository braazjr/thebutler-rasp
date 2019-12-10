import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DownloadDadosPage } from './download-dados.page';

describe('DownloadDadosPage', () => {
  let component: DownloadDadosPage;
  let fixture: ComponentFixture<DownloadDadosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadDadosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DownloadDadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
