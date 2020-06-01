import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedService } from './shared.service';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private http: HttpClient,
    private sharedService: SharedService
  ) { }

  pesquisarMotorista(idMotorista) {
    return this.http.get(`${environment.urlSpring}/usuarios/motorista/${idMotorista}`,
      { withCredentials: true, headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }
    ).pipe(
      catchError(error => {
        this.sharedService.showErrors(error, `Carregando moradores!`);
        return throwError(error);
      })
    );
  }
}
