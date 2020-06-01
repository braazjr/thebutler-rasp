import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { Network } from '@ionic-native/network/ngx';
// import { QRScanner } from '@ionic-native/qr-scanner/ngx';
// import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AuthInterceptorModule } from './shared/security/auth-interceptor/auth-interceptor.module';
import { LoadingUtil } from './utils/loading.util';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    AuthInterceptorModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthService,
    Network,
    // QRScanner, 
    // BarcodeScanner,
    LoadingUtil
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
