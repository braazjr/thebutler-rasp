import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EmbarqueMoradoresPage } from './embarque-moradores.page';

describe('EmbarqueMoradoresPage', () => {
  let component: EmbarqueMoradoresPage;
  let fixture: ComponentFixture<EmbarqueMoradoresPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmbarqueMoradoresPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EmbarqueMoradoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
