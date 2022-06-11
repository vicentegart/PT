//* componente para las Tags 
//* Tag Input Component for Angular (https://www.npmjs.com/package/ngx-chips)
//* ejemplo de uso (https://edupala.com/how-to-implement-angular-tags-in-angular-12/)

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { TagModel } from 'ngx-chips/core/accessor';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TagModel } from 'ngx-chips/core/tag-model';

@Component({
  selector: 'app-ng-chips',
  templateUrl: './ng-chips.component.html',
  styleUrls: ['./ng-chips.component.scss']
})
export class NgChipsComponent implements OnInit {

  items = ['Dev Op', 'Front-End Developer', 'Back-End Developer'];
  name: any;
  itemsAsObjects = [{ value: 0, name: 'Angular' }, { value: 1, name: 'React' }];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  requestAutocompleteItems = (text: any): Observable<any> => {
    const url = `./assets/data/states.JSON?q=${text}`;
    return this.http.get(url).pipe(map((data: any) => {
      return data.states;
    }));
  }

  onAdding(tag: TagModel): Observable<TagModel> {
    const confirm = window.confirm('¿Realmente desea agregar esta etiqueta?');
    return of(tag).pipe(filter(() => confirm));
  }

  onRemoving(tag: any): Observable<TagModel> {
    const confirm = window.confirm('¿Realmente desea eliminar esta etiqueta?' + 
    tag.name);
    return of(tag).pipe(filter(() => confirm));
  }

}
