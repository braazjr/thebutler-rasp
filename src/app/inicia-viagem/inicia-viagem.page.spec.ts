import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IniciaViagemPage } from './inicia-viagem.page';

describe('IniciaViagemPage', () => {
  let component: IniciaViagemPage;
  let fixture: ComponentFixture<IniciaViagemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IniciaViagemPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IniciaViagemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
