import { Component, OnInit, Input  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Integrante } from 'src/app/shared/interfaces/integrante';
import { EquipoService } from 'src/app/shared/services/equipo.service';

@Component({
  selector: 'app-equipo-detalle',
  templateUrl: './equipo-detalle.component.html',
  styleUrls: ['./equipo-detalle.component.scss']
})


export class EquipoDetalleComponent implements OnInit {

 /* @Input()
 integrante: Integrante; */
 integrante: Integrante | undefined;

  constructor(
    private route: ActivatedRoute, 
    private location: Location, 
    private equipoService: EquipoService ) { }

  ngOnInit(): void {
    this.geIntegrantes();
  }

  geIntegrantes(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.equipoService.getIntegrante(id)
      .subscribe(integrante => this.integrante = integrante);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.integrante) {
      this.equipoService.updateIntegrante(this.integrante)
        .subscribe(() => this.goBack());
    }
  }

}
