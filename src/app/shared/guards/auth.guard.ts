import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { StorageService } from '../services/storage.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private storageService: StorageService
  ) { }

  // eslint-disable-next-line max-len
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const user = this.authService.currentUser;

    return this.authService.isTokenExpired().pipe(
      map(data => {
        if (data.message === 'Token not Expired') {
          return true;
        }else if (data.message === 'Token Expired'){
          this.authService.user$.next(null);
          if (this.storageService.getLocalItem('user') !== null) {
            this.storageService.removeLocalItem('user');
          }
          if (this.storageService.getSessionItem('user') !== null) {
            this.storageService.removeSessionItem('user');
          }
          this.router.navigate(['/']);
          return false;
        }
        return false;
      })
    );
  }

  private isAuthorized(role: any, authorizedRoles: any[]): boolean {
    return authorizedRoles.indexOf(role) !== -1;
  }

}
