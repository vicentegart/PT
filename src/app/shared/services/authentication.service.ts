//* servicio generico de autenticacion (replicado a partir de proyecto similar)

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { User } from 'src/app/shared/model/user.model';
import { ApiService } from 'src/app/shared/services/api.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public user$: BehaviorSubject<User | null>;
  private rememberUser = true;

  get currentUser(): User | null {
    return this.user$.value;
  }

  constructor(
    private storageService: StorageService,
    private apiService: ApiService,
  ) {
    this.user$ = new BehaviorSubject(this.storageService.getLocalItem('user'));
  }

  signUp(data: any): Observable<any> {
    return this.apiService.post<any, any>(`user/auth/signup`, data);
  }

  isTokenExpired(): Observable<any> {
    this.apiService.removeHeader('appcache');
    return this.apiService.get<any>(`user/isTokenExpired`);
  }

  isRegularUser(): boolean {
    return this.currentUser?.role !== 'admin' &&
      this.currentUser?.role !== 'broker' &&
      this.currentUser?.role !== 'owner'}

  signIn(
    email: string,
    password: string,
    rememberMe: boolean
  ): Observable<User> {
    return this.apiService
      .post<User, any>(`user/auth/signin`, {
        email,
        password,
      })
      .pipe(
        map((res) => {
          return res as User;
        }),
        tap((user) => {
          this.rememberUser = rememberMe;
          if (!this.rememberUser) {
            this.storageService.setSessionItem('user', user);
          } else {
            this.storageService.setLocalItem('user', user);
          }
          this.user$.next(user);
        })
      );
  }

  signOut(): Observable<any> {
    return this.apiService.post('user/logout', {}).pipe(

      tap(() => {
        this.user$.next(null);
        if (this.storageService.getLocalItem('user') !== null) {
          this.storageService.removeLocalItem('user');
        }
        if (this.storageService.getSessionItem('user') !== null) {
          this.storageService.removeSessionItem('user');
        }
      })

    );
  }



  updateAccount(editUser: User): Observable<any> {
    return this.apiService.put(`user/${editUser.id}`, editUser);
  }

  confirmAccount(code: any): Observable<any> {
    return this.apiService.get<any>(
      `user/auth/signupConfirmation?code=${code}`
    );
  }

  resendConfirmationCode(email: string): Observable<any> {
    return this.apiService.get<any>(
      `user/auth/resendAccountConfirmationCode?email=${email}`
    );
  }

  changePassword(
    userId: number,
    newPassword: string,
    newPasswordConfirm: string
  ): Observable<void> {
    return this.apiService.post(`user/changePassword/${userId}`, {
      newPassword,
      newPasswordConfirm,
    });
  }

  sendchangePasswordResetCode(email: string): Observable<void> {
    return this.apiService.get<any>(
      `user/auth/sendPasswordResetCode?email=${email}`
    );
  }

  resetPassword(newPassword: string, code: string): Observable<void> {
    return this.apiService.post(`user/auth/resetPassword`, {
      code,
      newPassword,
    });
  }
}
