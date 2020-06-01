import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class AuthService {

  oauthTokenUrl = `${environment.urlSpring}/oauth/token`;
  jwtPayload: any;
  tokensRenokeUrl = `${environment.urlSpring}/tokens/revoke`;
  hds = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic dGhlYnV0bGVyX2FuZ3VsYXI6dGhlYnV0bGVyX2FuZ3VsYXI='
  });

  constructor(
    private http: HttpClient,
    private router: Router) { }

  login(usuario: String, senha: String): Observable<void> {
    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    console.info(`-- realizando login com o usuário ${usuario}`)
    return this.http.post(this.oauthTokenUrl, body,
      { headers: this.hds, withCredentials: true })
      .pipe(
        map(response => {
          console.info('-- usuário autenticado')
          this.armazenarTokenAndRefreshToken(response as any);
        }),
        catchError(response => {
          if (response.status === 400 && response.error === 'invalid_grant') {
            return Promise.reject('Usuário ou senha inválida!');
          }

          return Promise.reject(response);
        })
      )
  }

  private armazenarTokenAndRefreshToken(jwt: string) {
    localStorage.setItem('token', jwt['access_token']);
    localStorage.setItem('refreshToken', jwt['refresh_token']);
  }

  logout() {
    this.limparAccessToken();
    this.router.navigate(['/auth/login']);
  }

  limparAccessToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.jwtPayload = null;
  }

  isAccessTokenInvalido() {
    const token = localStorage.getItem('token');
    const jwtHelper: JwtHelperService = new JwtHelperService();

    return !token || jwtHelper.isTokenExpired(token);
  }

  obterNovoAccessToken() {
    const body = `grant_type=refresh_token&refresh_token=${localStorage.getItem('refreshToken')}`;

    return this.http.post(this.oauthTokenUrl, body,
      { headers: this.hds, withCredentials: true })
      .pipe(
        map(response => {
          this.armazenarTokenAndRefreshToken(response as any);
        }),
        catchError(error => {
          console.info('Erro ao renovar token.', error);
          return Promise.resolve(null);
        })
      )
  }
  loginAuto() {
    return this.login('juliene.ccorrea@gmail.com', 'juliene.ccorrea@gmail.com')
  }
}
