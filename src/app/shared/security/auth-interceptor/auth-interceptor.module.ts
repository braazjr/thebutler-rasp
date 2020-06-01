import { NgModule, Injectable } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http'
import { Observable, from, of } from 'rxjs'
import { AuthService } from 'src/app/services/auth.service'
import { switchMap, map, finalize, catchError } from 'rxjs/operators'
import { SharedModule } from '../../shared.module'
import { LoadingUtil } from 'src/app/utils/loading.util'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private loadingUtil: LoadingUtil
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('-- verificando token')

    return from(this.loadingUtil.criarLoading())
      .pipe(
        switchMap(loading => {
          loading.present()

          if (!this.isPublic(req) && !localStorage.getItem('token')) {
            console.info('-- client não logado')
            return this.authService.loginAuto()
              .pipe(
                switchMap(() => {
                  return this.continueHandle(next, req, loading)
                }),
                catchError(error => {
                  console.error(error)
                  return of(false)
                })
              )
          } else if (!this.isPublic(req) && this.authService.isAccessTokenInvalido()) {
            console.info('-- requisição com access token inválido. obtendo novo token...  ')

            return this.authService.obterNovoAccessToken()
              .pipe(
                switchMap(() => {
                  console.info('-- novo token gerado. seguindo com requisição...')

                  return this.continueHandle(next, req, loading)
                }),
                catchError(error => {
                  loading.dismiss()
                  return of(false)
                })
              )
          } else if (!this.isPublic(req)) {
            console.info('-- pagina publica')
            return this.continueHandle(next, req, loading)
          } else {
            loading.dismiss()
            return next.handle(req)
          }
        })
      )

  }

  private continueHandle(next: HttpHandler, req: HttpRequest<any>, loading): Observable<any> {
    return next.handle(req.clone({
      setHeaders: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }))
      .pipe(
        finalize(() => loading.dismiss())
      )
  }

  isPublic(req) {
    return req.url.includes('oauth/token')
  }
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class AuthInterceptorModule { }
