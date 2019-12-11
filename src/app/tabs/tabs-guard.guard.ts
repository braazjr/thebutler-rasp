import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TabsGuardGuard implements CanActivate {

  constructor(
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    const viagemAtual = localStorage.getItem('viagem-atual');
    if (viagemAtual && state.url != '' && state.url != '/' && state.url != '/tabs/embarque-moradores') {
      console.info('-- redirecionando para embarque de moradores');

      this.router.navigate(['/tabs/embarque-moradores']);
    }

    return true;
  }

}
