//* Servicio para manejo de funciones de almacenamiento local

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() { }

  public getLocalItem(key: string): any {
    try {
      return JSON.parse(localStorage.getItem(key) as any);
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  public setLocalItem(key: string, value: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  }

  public removeLocalItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.log(error);
    }
  }

  public getSessionItem(key: string): any {
    try {
      return JSON.parse(sessionStorage.getItem(key) as any);
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  public setSessionItem(key: string, value: any): void {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.log(e);
    }
  }

  public removeSessionItem(key: string): void {
    try {
      sessionStorage.removeItem(key);
    } catch (error) {
      console.log(error);
    }
  }
}
