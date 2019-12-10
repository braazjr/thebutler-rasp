import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

@Injectable()
export class AuthService {

  oauthTokenUrl = `${environment.urlSpring}/oauth/token`;
  jwtPayload: any;
  tokensRenokeUrl = `${environment.urlSpring}/tokens/revoke`;

  constructor(
    private http: HttpClient,
    private router: Router) { }

  login(usuario: String, senha: String): Observable<void> {
    const hds = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic cmFzcDpyYXNw'
    });

    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return this.http.post(this.oauthTokenUrl, body,
      { headers: hds, withCredentials: true })
      .pipe(
        switchMap(response => {
          this.armazenarToken(response['access_token']);

          return Promise.resolve();
        }),
        catchError(response => {
          if (response.status === 400 && response.error === 'invalid_grant') {
            return Promise.reject('Usuário ou senha inválida!');
          }

          return Promise.reject(response);
        })
      )
  }

  private armazenarToken(token: string) {
    localStorage.setItem('token', token);
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
    const hds = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic YW5ndWxhcjpAbmd1bEByMA=='
    });

    const body = 'grant_type=refresh_token';

    return this.http.post(this.oauthTokenUrl, body,
      { headers: hds, withCredentials: true })
      .pipe(
        switchMap(response => {
          this.armazenarToken(response['access_token']);

          console.info('-- novo access token criado');

          return Promise.resolve(null);
        }),
        catchError(error => {
          console.info('Erro ao renovar token.', error);
          return Promise.resolve(null);
        })
      );
  }
}
