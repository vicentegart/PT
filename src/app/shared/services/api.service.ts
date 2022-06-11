
//* Servico para las funciones principales de accesos a API externa
import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpRequest } from '@angular/common/http';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  private _headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json ',
    appcache: 'active'
  });

  private _headers3: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/octet-stream',
    responseType: 'blob',
    Accept: 'application/octet-stream',
    appcache: 'active',
    apploading: 'ignore'
  });

  private _headers4: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/pdf',
    Accept: 'application/pdf',
    appcache: 'active',
    apploading: 'ignore'
  });

  private _headers2: HttpHeaders = new HttpHeaders({
    Accept: 'application/json'
  });


  private _baseURl =
    `${environment.API_PROTOCOL}://${environment.API_HOST}:${environment.API_PORT}/api/v${environment.API_VERSION}/`;

  constructor(private http: HttpClient) { }

  get<T>(url: string, params: HttpParams = new HttpParams()): Observable<T> {
    return this.http.get<T>(this._baseURl + url, {
      headers: this._headers, params
    });
  }

  getFile<T>(url: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(this._baseURl + url,  {
      responseType: 'blob',
      headers: this._headers3,
      observe: 'response',
      params
    });
  }

  getBlob<T>(url: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(this._baseURl + url, {
      responseType: 'blob',
      headers: this._headers4,
      observe: 'response',
      params
    });
  }

  post<T, D>(url: string, data: D): Observable<T> {
    return this.http.post<T>(this._baseURl + url, JSON.stringify(data), {
      headers: this._headers
    });
  }

  postMultipart<T, D>(url: string, data: D): Observable<T> {
    return this.http.post<T>(this._baseURl + url, data, {
      headers: this._headers2
    });
  }

  put<T, D>(url: string, data: D): Observable<T> {
    return this.http.put<T>(this._baseURl + url, JSON.stringify(data), {
      headers: this._headers
    });
  }

  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(this._baseURl + url);
  }

  removeHeader(key: string): void {
    this._headers = this._headers.delete(key);
  }

  appendHeader(key: string, value: string | string[]): void {
    this._headers = this._headers.append(key, value);
  }

}
