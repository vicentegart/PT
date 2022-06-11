import { Component, OnInit } from '@angular/core';
import { Integrante } from 'src/app/shared/interfaces/integrante';
import { EquipoService } from 'src/app/shared/services/equipo.service';
import { MensajeService } from 'src/app/shared/services/mensaje.service';
import { INTEGRANTES } from 'src/app/shared/mocks/mocks';

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.scss']
})
export class EquipoComponent implements OnInit {

  
  integrantes: Integrante[] = [];
  selectedIntegrante?: Integrante;

  constructor(private equipoService: EquipoService, private servicioMensaje: MensajeService) { }

  ngOnInit(): void {
    //* carga los integrantes en el inicio
    this.getIntegrantes();
  }

  onSelect(integranteSeleccionado: Integrante): void {
    this.selectedIntegrante = integranteSeleccionado;
    this.servicioMensaje.add(`EquipoComponent: Integrante seleccionado =${integranteSeleccionado.id}`);
  }

  getIntegrantes(): void {
    this.equipoService.getEquipo()
    .subscribe(integrantes => this.integrantes = integrantes);
  }

  add(nombre: string): void {
    nombre = nombre.trim();
    if (!nombre) { return; }
    this.equipoService.addIntegrante({ nombre } as unknown as Integrante)
      .subscribe(integrante => {
        this.integrantes.push(integrante);
      });
  }

  delete(integrante: Integrante): void {
    this.integrantes = this.integrantes.filter(h => h !== integrante);
    this.equipoService.deleteIntegrante(integrante.id).subscribe();
  }

}
