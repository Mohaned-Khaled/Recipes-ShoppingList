import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable, take, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean | UrlTree> | Promise<boolean> {
    return this.authService.user.pipe(
      take(1),
      map((user) => {
        const isAuth = user ? true : false;
        if (isAuth) return true;
        else return this.router.createUrlTree(['/auth']);
      })
      // tap((bool) => {
      //   if (!bool) this.router.navigate(['/auth']);
      // })
    );
  }
}
