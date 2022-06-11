//* Dependiendo de lo complejo del proyecto puede ser resultar más cómodo
//* o más claro separar las funciones de Interceptors en diferentes archivos
//* request, tokens de autenticacion, errores, etc.


//* Interceptor para manejo de token de autenticacion (proyecto similar)

import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private auth: AuthenticationService
  ) { }

  intercept(
    request: HttpRequest<Request>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const user = this.auth.currentUser;
    const isSignedIn = user && user.accessToken && user.tokenType;
    const isApiUrl = request.url.includes(environment.API_HOST);
    if (isSignedIn && isApiUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: `${user?.tokenType} ${user?.accessToken}`
        }
      });
    }
    return next.handle(request);
  }
}
