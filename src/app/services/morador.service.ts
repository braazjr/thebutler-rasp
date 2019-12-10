import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SharedService } from './shared.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MoradorService {

  constructor(
    private http: HttpClient,
    private sharedService: SharedService
  ) { }

  downloadMoradores() {
    return this.http.get(`${environment.urlSpring}/rasp/usuarios/rasp-version`,
      { withCredentials: true, headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }
    ).pipe(
      catchError(error => {
        this.sharedService.showErrors(error, `Carregando moradores!`);
        return Observable.throw(error);
      })
    );
  }
}
