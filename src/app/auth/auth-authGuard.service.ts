import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthAuthGuardService implements CanActivate {
  constructor(private authSerivce: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.authSerivce.user.pipe(
      take(1),
      map((user) => {
        const isUser = user ? true : false;
        if (!isUser) return true;
        else return this.router.createUrlTree(['/recipes']);
      })
    );
  }
}
