import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
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
    return this.http.get(`${environment.urlSpring}/rasp/moradores`)
      .pipe(
        catchError(error => {
          this.sharedService.showErrors(error, `Carregando moradores!`);
          return throwError(error);
        })
      );
  }
}
