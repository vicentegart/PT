//* Dependiendo de lo complejo del proyecto puede ser resultar más cómodo
//* o más claro separar las funciones de Interceptors en diferentes archivos
//* request, tokens de autenticacion, errores, etc.


//* Interceptor para manejo de peticiones http pendientes (proyecto similar)

/**
 * Handle pending HTTP requests
 */
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { EMPTY, Observable, of, Subject } from 'rxjs';
import { distinctUntilChanged, shareReplay, tap } from 'rxjs/operators';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  private _req: Map<string, HttpRequest<any>> = new Map();

  cancelPendingRequests = new Subject();

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req);
  }
}
