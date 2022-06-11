import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Integrante } from '../interfaces/integrante';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

  createDb() {
    const equipo = [
      { id: 2, nombre: 'Wilkie', rol:  'Dev Op' },
      { id: 3, nombre: 'Jose', rol: 'Front-End Dev' },
      { id: 4, nombre: 'Vicente', rol:  'Designer' },
      { id: 5, nombre: 'Francisco', rol: 'Back-End Dev' },
      { id: 6, nombre: 'Pancho', rol: 'Back-End Dev' }
    ];
    return {equipo};
  }

  //sobrecarga el metodo genId para que el integrante siempre tenga un id
  genId(equipo: Integrante[]): number {
    return equipo.length > 0 ? Math.max(...equipo.map(integrante => integrante.id)) + 1 : 11;
  }
}
