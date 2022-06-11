import { Injectable } from '@angular/core';
import { Integrante } from '../interfaces/integrante';
import { INTEGRANTES } from '../mocks/mocks';
import { Observable, of } from 'rxjs';
import { MensajeService } from './mensaje.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EquipoService {

  private equipoUrl = 'api/equipo';  // URL a la web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private mensajeSeervice: MensajeService,
    private http: HttpClient) { }

  geIntegrantes(): Observable<Integrante[]> {
    const integrantes = of(INTEGRANTES);
    this.mensajeSeervice.add('EquipoService: integrantes obtenidos');
    return integrantes;
  }

  //* obtener un integrante por su id
  getIntegrante(id: number): Observable<Integrante> {
    const url =  `${this.equipoUrl}/${id}`;
    return this.http.get<Integrante>(url)
      .pipe(
        tap(_ => this.log(`Integrante id=${id}`)),
        catchError(this.handleError<Integrante>(`getIntegrante id=${id}`))
      );
  }

  private log(message: string) {
    this.mensajeSeervice.add(`EquipoService: ${message}`);
  }

  //*obtener todos los integrantes del equipo (mock) de trabajo
  getEquipo(): Observable<Integrante[]> {
    //*variante con http
    return this.http.get<Integrante[]>(this.equipoUrl)
    .pipe(
      tap(_ => this.log('Integrantes de equipo obtenidos')),
      catchError(this.handleError<Integrante[]>('getEquipo', []))
    );
  }

  //* PUT: actualiza el integrante del equipo de trabajo 
  updateIntegrante(integrante: Integrante): Observable<any> {
    return this.http.put(this.equipoUrl, integrante, this.httpOptions).pipe(
      tap(_ => this.log(`Integrante actualizado id=${integrante.id}`)),
      catchError(this.handleError<any>('updateIntegrante'))
    );
  }

  //* POST: adiciona nuevo integrante 
addIntegrante(integrante: Integrante): Observable<Integrante> {
  return this.http.post<Integrante>(this.equipoUrl, integrante, this.httpOptions).pipe(
    tap((nuevoIntegrante: Integrante) => this.log(`integrante añadido w/ id=${nuevoIntegrante.id}`)),
    catchError(this.handleError<Integrante>('addIntegrante'))
  );
}

//* DELETE: elimina integrante 
deleteIntegrante(id: number): Observable<Integrante> {
  const url = `${this.equipoUrl}/${id}`;

  return this.http.delete<Integrante>(url, this.httpOptions).pipe(
    tap(_ => this.log(`integrante eliminado id=${id}`)),
    catchError(this.handleError<Integrante>('deleteIntegrante'))
  );
}

  //*manejo de error: https://angular.io/tutorial/toh-pt6
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
