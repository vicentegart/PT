import { Component, OnInit } from '@angular/core';
import { Integrante } from 'src/app/shared/interfaces/integrante';
import { EquipoService } from 'src/app/shared/services/equipo.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  integrantes: Integrante[] = [];

  constructor(private equipoService: EquipoService) { }

  ngOnInit(): void {
  }

  getEquipo(): void {
    this.equipoService.geIntegrantes()
      .subscribe(integrantes => this.integrantes = integrantes.slice(1, 3));
  }

}
